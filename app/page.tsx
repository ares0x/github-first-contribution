import GithubSearch from '../components/GithubSearch';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">GitHub首次贡献查询</h1>
      <GithubSearch />
    </main>
  );
}