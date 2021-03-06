import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import SelectContainer from './SelectContainer';
import SelectMenu from './SelectMenu';

import withStyles from '@material-ui/core/styles/withStyles';
import Styles from './Styles';

const Select = props => (
  <SelectContainer
    {..._.pick(
      props, [
        'options',
        'containerClassName',
        'handleChange',
        'stayOpenAfterSelection',
        'selectedValue',
        'handleClearValue',
        'loading',
        'handleInputChange',
        'manual',
        'disabled',
      ])}
  >
    {({
      getFilteredOptions,
      handleInputChange,
      handleClearValue,
      handleKeyDown,
      handleChange,
      handleClickTextInput,
      onClickAway,
      setFocusedOption,
      // from state
      menuOpen,
      inputValue,
      focusedOption,
      enteringText,
    }) => {
      const _menuOpen = menuOpen && getFilteredOptions(inputValue).length != 0;
      const _placeholder = !props.selectedValue ? props.placeholder : '';
      const showMUILabel = (
        !props.hideLabel &&
        !props.selectedValue &&
        props.label
      );
      const showManualLabel = (
        !props.hideLabel &&
        props.selectedValue &&
        props.label
      );

      return (
        <div>
          <div className={props.classes.rmss_input_container}>
            <div className={props.classes.rmss_selected_value_container}>
              {enteringText && inputValue ? null : (
                props.selectedValue ? (
                  <p>{props.selectedValue.label}</p>
                ) : null
              )}
            </div>
            <div className={props.classes.rmss_input_and_label_container}>
              {showManualLabel ? (
                <InputLabel
                  shrink
                  focused={enteringText || _menuOpen}
                >
                  {props.label}
                </InputLabel>
              ) : null}
              <TextField
                fullWidth
                disabled={props.disabled}
                onChange={handleInputChange}
                onClick={handleClickTextInput}
                value={props.selectedValue && !enteringText ? '' : inputValue}
                onKeyDown={handleKeyDown}
                label={showMUILabel ? props.label : undefined}
                placeholder={_placeholder}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position='end'
                      classes={{ root: props.classes.rmss_global_input_adornment_container }}
                    >
                      {props.loading ? (
                        <CircularProgress size={20} />
                      ) : props.selectedValue ? (
                        <IconButton onClick={handleClearValue}>
                          <CloseIcon
                            classes={{ root: `${props.classes.rmss_global_input_end_adornement_container} close-button` }}
                          />
                        </IconButton>
                      ) : (
                        props.showSearchIcon ? (
                          <SearchIcon
                            classes={{ root: props.classes.rmss_global_input_end_adornement_container }}
                          />
                        ) : <div />
                      )}
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>

          <SelectMenu
            open={_menuOpen}
            options={getFilteredOptions(inputValue)}
            onClickAway={onClickAway}
            handleChange={handleChange}
            handleMouseEnterOption={setFocusedOption}
            focusedOption={focusedOption}
            selectedValue={props.selectedValue}
          />
        </div>
      )
    }}
  </SelectContainer>
)

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedValue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  containerClassName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  handleClearValue: PropTypes.func,
  MenuItem: PropTypes.node,
  stayOpenAfterSelection: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  manual: PropTypes.bool,
  hideLabel: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
};

Select.defaultProps = {
  containerClassName: '',
  handleInputChange: () => {},
  handleClearValue: () => {},
  MenuItem: null,
  stayOpenAfterSelection: false,
  selectedValue: null,
  label: '',
  loading: false,
  disabled: false,
  manual: false,
  hideLabel: false,
  showSearchIcon: true,
};

export default withStyles(Styles)(Select);
