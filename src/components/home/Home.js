import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '../../redux/stockData/stockDataSlice';
import { fetchStockData } from '../../redux/stockData/stockApi';
import './home.scss';
import { Button } from 'antd'; // Import the Button component from Ant Design
import { RightOutlined } from '@ant-design/icons';

const Home = () => {
  const stockData = useSelector((state) => state.stockData);
  const dispatch = useDispatch();

  const handleFetchData = async () => {
    dispatch(fetchDataStart());

    try {
      const data = await fetchStockData();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="companyContainer">
      {/* ... */}
      {stockData.data && stockData.data.map((item, index) => (
        <div className="company-card" key={index}>
          <ul className="company-info">
            <li className="symbol">{item.symbol}</li>
            <li className="name">{item.name}</li>
            <li className="exchange">{item.exchangeShortName}</li>
          </ul>
          <div className="button-container">
            <Link to={`/stock/${item.symbol}`}>
              <Button type="text" icon={<RightOutlined />} className="view-details-button">
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;