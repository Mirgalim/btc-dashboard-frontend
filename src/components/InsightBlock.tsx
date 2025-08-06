type Props = {
    text: string;
  };
  
  const InsightBlock = ({ text }: Props) => {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-md shadow">
        <h3 className="font-semibold mb-2">AI Insight</h3>
        <p>{text}</p>
      </div>
    );
  };
  
  export default InsightBlock;
  