import React from 'react';
import './StatsPage.css';
import useFetch from '../../hooks/useFetch';
import { topUniqueFiveApi, topFiveApi, lastFiveDaysApi } from '../../api';
const StatsPage = () => {
  const {
    data: topFiveData,
    isLoading: loadFive,
    error: errorFive,
  } = useFetch(topFiveApi);
  const {
    data: topUniqueData,
    isLoading: loadUnique,
    error: errorUnique,
  } = useFetch(topUniqueFiveApi);
  const {
    data: fiveDaysData,
    isLoading: loadDays,
    error: errorDays,
  } = useFetch(lastFiveDaysApi);
  if (loadFive || loadUnique || loadDays) return 'Loading...';
  if (errorFive || errorUnique || errorDays)
    return `ERROR FROM THE SERVER ${errorFive || errorUnique || errorDays}`;
  console.log('k', topFiveData, topUniqueData, fiveDaysData);

  return (
    <div>
      <h1 style={{ margin: '20px auto 30px auto' }}>Stats</h1>
      <div className='stats-container'>
        <div className='stats-item-container'>
          <h2 className='stats-title'>Top 5</h2>
          {topFiveData.map((item, idx) => (
            <div key={idx} className='row-item'>
              <p>
                Product: <span>{item._id}</span>
              </p>
              <p>
                Sales: <span>{item.topSales}</span>
              </p>
            </div>
          ))}
        </div>
        <div className='stats-item-container'>
          <h2 className='stats-title'>Top 5 Unique</h2>
          {topUniqueData.map((item, idx) => (
            <div key={idx} className='row-item'>
              <p>
                Product: <span>{item._id}</span>
              </p>
              <p>
                Sales: <span>{item.topSales}</span>
              </p>
            </div>
          ))}
        </div>
        <div className='stats-item-container'>
          <h2 className='stats-title'>Last 5 Days</h2>
          {fiveDaysData.map((item, idx) => (
            <div key={idx} className='row-item'>
              <p>
                Date: <span>{item._id}</span>
              </p>
              <p>
                total: <span>{item.totalSales}$</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatsPage;
