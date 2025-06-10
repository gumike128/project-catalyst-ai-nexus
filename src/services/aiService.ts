
import { useProjectStore } from '../stores/projectStore';

const aiResponses = [
  "Based on your project requirements, I recommend starting with a solid architectural foundation. Consider implementing a microservices approach if scalability is a priority.",
  "Your project shows great potential! I suggest focusing on user experience design first, as it will guide many technical decisions later.",
  "From the analysis, I can see this is a complex project. Breaking it down into smaller, manageable phases would increase success probability.",
  "The technology stack you've chosen is well-suited for this type of project. Make sure to plan for proper testing and deployment strategies.",
  "I notice some potential performance bottlenecks in the current approach. Consider implementing caching mechanisms and database optimization.",
  "Security should be a top priority for this project. I recommend implementing authentication, authorization, and data encryption from the start.",
  "This project would benefit from a mobile-first design approach, given the target audience and usage patterns.",
  "The scope seems ambitious but achievable. I suggest creating a detailed timeline with clear milestones to track progress effectively.",
  "Based on similar projects, I recommend allocating extra time for integration testing and user acceptance testing.",
  "Consider implementing monitoring and analytics from the beginning to gather insights about user behavior and system performance."
];

const suggestedQuestions = [
  "What are the main risks for this project?",
  "How can I optimize the performance?",
  "What testing strategy do you recommend?",
  "How should I structure the development timeline?",
  "What security measures should I implement?",
  "Which technologies work best for this use case?",
  "How can I improve user experience?",
  "What are the scalability considerations?",
  "How should I plan the deployment strategy?",
  "What documentation should I create?"
];

export const generateAIResponse = async (userMessage: string, projectId?: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simple keyword-based response generation
  const message = userMessage.toLowerCase();
  
  if (message.includes('risk') || message.includes('problem')) {
    return "Based on the project analysis, the main risks I identify are: technical complexity, timeline constraints, and resource allocation. I recommend implementing risk mitigation strategies like parallel development tracks and regular checkpoints.";
  }
  
  if (message.includes('performance') || message.includes('optimization')) {
    return "For performance optimization, I suggest implementing caching strategies, database indexing, and code splitting. Consider using performance monitoring tools to identify bottlenecks early in development.";
  }
  
  if (message.includes('testing') || message.includes('quality')) {
    return "A comprehensive testing strategy should include unit tests, integration tests, and end-to-end tests. I recommend implementing test-driven development and setting up automated testing in your CI/CD pipeline.";
  }
  
  if (message.includes('security')) {
    return "Security best practices include implementing proper authentication and authorization, using HTTPS, validating all inputs, and keeping dependencies updated. Consider conducting security audits regularly.";
  }
  
  if (message.includes('timeline') || message.includes('schedule')) {
    return "For effective timeline management, break the project into 2-week sprints, include buffer time for unexpected issues, and prioritize features based on user value. Regular stakeholder reviews are essential.";
  }
  
  if (message.includes('technology') || message.includes('tech stack')) {
    return "The current technology stack is well-chosen for this project type. Make sure all team members are familiar with the technologies, and have fallback options for any experimental tools.";
  }
  
  if (message.includes('team') || message.includes('resources')) {
    return "Based on the project complexity, you'll need a balanced team with frontend, backend, and DevOps skills. Consider the experience level and ensure knowledge sharing within the team.";
  }
  
  if (message.includes('deployment') || message.includes('hosting')) {
    return "For deployment, I recommend using containerization with Docker, implementing blue-green deployment strategy, and setting up monitoring and logging. Choose a cloud provider that matches your scalability needs.";
  }
  
  // Default responses
  return aiResponses[Math.floor(Math.random() * aiResponses.length)];
};

export const getSuggestedQuestions = (projectId?: string): string[] => {
  return suggestedQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
};

export const generateProjectInsight = (projectId: string): string => {
  const insights = [
    "This project is progressing well and is on track for completion.",
    "Consider allocating more resources to testing and quality assurance.",
    "The current architecture should handle the expected user load efficiently.",
    "Security measures are adequate but could be enhanced with additional monitoring.",
    "User feedback suggests the interface is intuitive and user-friendly.",
    "Performance benchmarks are meeting expectations across all metrics.",
    "The development timeline is realistic given the current progress rate.",
    "Consider implementing additional backup and disaster recovery measures."
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
};
