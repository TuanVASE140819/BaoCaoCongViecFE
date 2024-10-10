import React, { useState } from 'react';

const WorkReport = () => {
  const [todayReport, setTodayReport] = useState('');
  const [tomorrowReport, setTomorrowReport] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Today Report:', todayReport);
    console.log('Tomorrow Report:', tomorrowReport);
    console.log('Date:', date);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Báo cáo công việc
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="date"
          >
            Ngày
          </label>
          <input
            type="date"
            id="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="todayReport"
          >
            Báo cáo công việc hôm nay
          </label>
          <textarea
            id="todayReport"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            rows={4}
            value={todayReport}
            onChange={(e) => setTodayReport(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2"
            htmlFor="tomorrowReport"
          >
            Báo cáo công việc ngày mai
          </label>
          <textarea
            id="tomorrowReport"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            rows={4}
            value={tomorrowReport}
            onChange={(e) => setTomorrowReport(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Gửi báo cáo
        </button>
      </form>
    </div>
  );
};

export default WorkReport;
