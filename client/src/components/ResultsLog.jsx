function ResultsLog() {
    
    if (window.localStorage.getItem('results')) {
        const allUserResults = JSON.parse(window.localStorage.getItem('results')).reverse();
        return (
        <div className="relative overflow-x-auto">
            <table className="table-auto w-full mt-5 border-spacing-2 border-separate">
                <thead className='bg-red-300 text-white'>
                    <tr>
                        <th className="p-2 w-32">Name</th>
                        <th className="p-2 w-16">Earn Points</th>
                        <th className="p-2 w-32">Result</th>
                    </tr>
                </thead>
                <tbody>
                    {allUserResults.map((result) => (
                        <tr key={result.id} className='text-center'>
                            <td className='p-2 whitespace-nowrap'>{result.username}</td>
                            <td className='p-2 whitespace-nowrap'>{result.userEarnedPoints}</td>
                            <td className='p-2 whitespace-nowrap'>{result.isPassed ? 'Passed' : 'Failed'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
}

export default ResultsLog;
