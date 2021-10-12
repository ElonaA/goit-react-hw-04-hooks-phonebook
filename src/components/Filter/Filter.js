import PropTypes from 'prop-types';
import { Inner, Input, Label } from './Filter.styled';

function Filter({ filter, onChangeFilter }) {

  return (
    <Inner>
      <Label>Find contact</Label>
      <Input
        name="filter"
        placeholder="Enter search word..."
        filter={filter}
        onChange={e => {
          onChangeFilter(e.target.value);
        }}
      />
    </Inner>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};


export default Filter;