"use client";

import React from "react";

type NewsItem = {
  title: string;
  url: string;
  description: string;
};

type Props = {
  insight: string;
  news: NewsItem[];
};

const InsightBlock: React.FC<Props> = ({ insight, news }) => {
  return (
    <div className="bg-white dark:bg-[#1f2937] rounded-3xl p-6 space-y-6 shadow-md">
      {/* 🔹 AI Insight */}
      <div>
        <h2 className="text-xl font-semibold mb-2">AI Technical Insight</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {insight}
        </p>
      </div>

      {/* 🔹 Latest News */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Bitcoin News</h2>
        <ul className="space-y-4">
          {news.map((item, index) => (
            <li key={index} className="border-l-4 border-blue-500 pl-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                {item.title}
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightBlock;
