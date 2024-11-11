import { Card, Spin } from 'antd';
import PropTypes from 'prop-types';

function CryptocurrencyCard(props) {
  const { currency } = props;

  if (!currency) {
    return <Spin size="large" className="mx-auto my-auto" />;
  }

  return (
    <div>
      <Card
        title={
          <div className="flex items-center gap-3">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
              alt={currency.name}
            />
            <span>{currency.name}</span>
          </div>
        }
        extra={<a href="#">More</a>}
        style={{
          width: 300,
        }}
      >
        <p>Текущая цена: ${currency.quote.USD.price.toFixed(2)}</p>
        <p>Изменение за 24 часа: {currency.quote.USD.percent_change_24h.toFixed(2)}%</p>
        <p>Текущая капитализация: ${currency.quote.USD.market_cap.toLocaleString()}</p>
      </Card>
    </div>
  );
}

CryptocurrencyCard.propTypes = {
  currency: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quote: PropTypes.shape({
      USD: PropTypes.shape({
        price: PropTypes.number.isRequired,
        percent_change_24h: PropTypes.number.isRequired,
        market_cap: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CryptocurrencyCard;
