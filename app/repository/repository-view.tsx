"use client";

import { atom, useAtom } from "jotai";
import { MultiSelectBox } from "../ui/multi-selectbox";
import { Repository } from "@/services/githubService";
import { useSession } from "next-auth/react";
import { saveUserData } from "../lib/action";
import { useState } from "react";

const selectedReposAtom = atom<number[]>([]);

export type Props = {
  repos: Repository[];
};

export function RepositoryView({ repos }: Props) {
  const [selectedRepos, setSelectedRepos] = useAtom(selectedReposAtom);
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const toggleRepo = async (repoId: number) => {
    const newSelectedRepos = selectedRepos.includes(repoId)
      ? selectedRepos.filter((id) => id !== repoId)
      : [...selectedRepos, repoId];

    setSelectedRepos(newSelectedRepos);
  };

  const selectedReposList = repos.filter((repo) =>
    selectedRepos.includes(repo.id)
  );

  const handleSave = async () => {
    if (!session?.user?.image || !session?.user?.name) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveUserData(
        {
          image: session?.user.image,
          name: session?.user.name,
        },
        selectedReposList.map((repo) => ({
          id: repo.id.toString(),
          name: repo.name,
        }))
      );
      if (result.message === "success") {
        alert("선택한 레포지토리가 저장되었습니다.");
        setSelectedRepos([]);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving repositories:", error);
      alert(
        `레포지토리 저장 중 오류가 발생했습니다: ${
          error instanceof Error ? error.message : "알 수 없는 오류"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Repository Page</h1>
      <MultiSelectBox
        options={repos}
        selectedOptions={selectedRepos}
        onOptionToggle={toggleRepo}
      />
      {selectedReposList.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">선택된 레포지토리:</h2>
          <ul className="list-disc pl-5">
            {selectedReposList.map((repo) => (
              <li key={repo.id} className="mb-2">
                <p>{repo.name}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSaving ? "저장 중..." : "완료"}
          </button>
        </div>
      ) : (
        <p>선택된 레포지토리가 없습니다.</p>
      )}
    </main>
  );
}
