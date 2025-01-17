import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import UpdateOperation from './UpdateOperation';
import { mapCommandToFunction } from '../../../utils/commandOperations';

// eslint-disable-next-line no-unused-vars
function OperationNow({ operation, setOperation }) {
  const connectionStatus = useSelector((state) => state.connectionStatus);
  const [options, setOptions] = useState(operation.options);
  const optionsRef = useRef();
  optionsRef.current = options; // todo: is this messing things up??

  const operationWithOptions = () => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, operation);
    withOps.options = optionsRef.current;
    return () => mapCommandToFunction(withOps)();
  };

  useEffect(() => {
    // todo: this seems like bad code. fix
    const withOps = {};
    Object.assign(withOps, operation);
    withOps.options = optionsRef.current;
    setOperation(withOps);
  }, [options]);

  useEffect(() => {
    setOptions(operation.options);
  }, [operation]);

  return (
    <div style={{ marginRight: '8%' }}>
      <Button
        onClick={() => { operationWithOptions()(); }}
        variant="contained"
        disabled={!connectionStatus.isConnected}
      >
        Run Now
      </Button>
      <UpdateOperation options={options} setOptionsParent={setOptions} />
    </div>
  );
}

OperationNow.propTypes = {
  operation: PropTypes.shape({
    module: PropTypes.string.isRequired,
    friendlyName: PropTypes.string.isRequired,
    subCommand: PropTypes.string,
    data: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object,
  }).isRequired,
  setOperation: PropTypes.func.isRequired,
};

export default OperationNow;
