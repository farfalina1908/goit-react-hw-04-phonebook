import PropTypes from 'prop-types';
import css from './Filter.module.css';
import Input from '../Input/Input';

const Filter = ({ onChange, value, name, type, title, pattern }) => {
  return (
    <>
      <h2 className={css.filterTitle}>Find contacts by name</h2>
      <Input
        type={type}
        title={title}
        name={name}
        value={value}
        pattern={pattern}
        onChange={onChange}
      />
    </>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
};

export default Filter;
