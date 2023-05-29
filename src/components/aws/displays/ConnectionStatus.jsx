/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import { 
  green, 
  yellow, 
  orange, 
  red, 
  blueGrey,
} from '@mui/material/colors';
import { Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE } from '@aws-amplify/pubsub';
import { addEntryToLog } from '../../../utils/log';

function ConnectionStatus({ setIsConnected }) {
  const colorDefault = blueGrey;
  const colorMap = {
    Connected: green, // Connected and working with no issues.
    ConnectedPendingDisconnect: colorDefault, // The connection has no active subscriptions and is disconnecting.
    ConnectedPendingKeepAlive: colorDefault, // The connection is open, but has missed expected keep alive messages.
    ConnectedPendingNetwork: colorDefault, // The connection is open, but the network connection has been disrupted. When the network recovers, the connection will continue serving traffic.
    Connecting: yellow, // Attempting to connect.
    ConnectionDisrupted: orange, // The connection is disrupted and the network is available.
    ConnectionDisruptedPendingNetwork: colorDefault, // The connection is disrupted and the network connection is unavailable.
    Disconnected: red, // Connection has no active subscriptions and is disconnecting.
  };

  const [connectionState, setConnectionState] = useState('undefined');
  const [connectionColor, setConnectionColor] = useState(colorDefault);

  useEffect(() => {
    // todo: abstract into a function
    Hub.listen('pubsub', (data) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const newState = payload.data.connectionState;
        setConnectionState(newState);
        setConnectionColor(colorMap[newState]);
        setIsConnected(newState === 'Connected');
        addEntryToLog('ConnectionState:', newState);
      }
    });   
  }, [connectionState, connectionColor]);

  // todo: add connectionstate padding
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}> 
      <p>Connection State: </p>
      <Chip label={connectionState} style={{ backgroundColor: connectionColor[500], alignSelf: 'center' }} />
    </div>
  );
}

ConnectionStatus.propTypes = {
  setIsConnected: PropTypes.func.isRequired,
};

export default ConnectionStatus;