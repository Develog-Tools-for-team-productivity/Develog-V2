import { Repository } from "@/services/githubService";

type Props = {
  repos: Repository[];
};

export function RepositoryView({ repos }: Props) {
  return (
    <main>
      <h1>Repository Page</h1>
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <p>{repo.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>레포지토리를 찾을 수 없습니다.</p>
      )}
    </main>
  );
}
