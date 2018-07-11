import withStyles from '@material-ui/core/styles/withStyles';
import selectStyles from './Styles';
import UnStyledSelect from './Select';
import UnStyledMultiSelect from './MultiSelect';
import UnStyledCreatable from './Creatable';

const Select = withStyles(selectStyles)(UnStyledSelect);
const MultiSelect = withStyles(selectStyles)(UnStyledMultiSelect);
const Creatable = withStyles(selectStyles)(UnStyledCreatable);

export default Select;

export {
  Select,
  MultiSelect,
  Creatable
};