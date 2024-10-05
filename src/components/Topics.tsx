import React, { useEffect, useState } from "react";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);

  // Fetch topics from the API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:3000/getTopics");
          const data = await response.json();
          console.log(data);
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, []);

  // Toggle the expanded state of the topic
  const toggleExpand = (id) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Topics Directory</h1>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic._id}>
            <div
              onClick={() => toggleExpand(topic._id)}
              className="cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-2 text-lg text-white"
            >
              {topic.name}
            </div>
            {expandedTopic === topic._id &&
              topic.child &&
              topic.child.length > 0 && (
                <div className="ml-4 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg p-2">
                  {topic.child.map((child) => (
                    <div key={child._id} className="text-lg text-white">
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
