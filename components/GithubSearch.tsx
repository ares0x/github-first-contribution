'use client'
import React, { useState } from 'react';
import axios from 'axios';

function GithubSearch() {
  const [username, setUsername] = useState('');
  const [contribution, setContribution] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/events/public`);
      const firstContribution = response.data.find((event: any) => 
        event.type === 'PullRequestEvent' || event.type === 'PushEvent'
      );
      setContribution(firstContribution);
    } catch (err) {
      setError('未找到用户或发生错误');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder="输入GitHub用户名"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button 
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
      >
        搜索
      </button>
      
      {loading && <p className="mt-4 text-gray-600">加载中...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {contribution && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">首次贡献:</h2>
          <p><span className="font-semibold">类型:</span> {contribution.type}</p>
          <p><span className="font-semibold">仓库:</span> {contribution.repo.name}</p>
          <p><span className="font-semibold">时间:</span> {new Date(contribution.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default GithubSearch;