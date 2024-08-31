import React, { useState } from "react";

interface GitHubProfileData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
}

const GitHubProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState<GitHubProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchGithub = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setError(null);
      } else {
        setProfile(null);
        setError(data.message);
      }
    } catch (error) {
      setProfile(null);
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Search with Username
        </h1>
        <div className="flex items-center justify-between bg-gray-800 p-3 border border-gray-600 rounded-md">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Github Username"
            className="bg-transparent border-none outline-none w-4/5 text-white text-sm"
          />
          <button
            onClick={searchGithub}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Search
          </button>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {profile && (
          <div className="mt-6 bg-gray-800 p-6 border border-gray-600 rounded-md">
            <div className="md:flex block">
              <div className="md:h-34 md:w-34 h-20 w-20 rounded-full overflow-hidden mr-4">
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {profile.name || profile.login}
                </h2>
                <p className="text-sm text-indigo-400">@{profile.login}</p>
                <p className="mt-2 text-sm">
                  {profile.bio || "Account doesn't have a bio."}
                </p>
                <div className="flex justify-between mt-4 bg-gray-700 p-4 rounded-md">
                  <div className="text-center">
                    <div className="text-sm font-semibold">Public Repos</div>
                    <div className="text-lg">{profile.public_repos}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">Followers</div>
                    <div className="text-lg">{profile.followers}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">Following</div>
                    <div className="text-lg">{profile.following}</div>
                  </div>
                </div>
                <div className="flex flex-wrap mt-4">
                  <p className="w-1/2 text-sm">{profile.location || "Not Available"}</p>
                  <p className="w-1/2 text-sm">{profile.blog || "Not Available"}</p>
                  <p className="w-1/2 text-sm">{profile.twitter_username || "Not Available"}</p>
                  <p className="w-1/2 text-sm">{profile.company || "Not Available"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubProfile;
