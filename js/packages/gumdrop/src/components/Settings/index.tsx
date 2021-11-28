import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ENDPOINTS, useConnectionConfig } from '../../contexts';
import { notify, shortenAddress } from '@oyster/common';
import { CopyOutlined } from '@ant-design/icons';
import { ModalEnum, useModal, useWalletModal } from '../../contexts';
import {
  Button,
  FormControl,
  Link,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

export const Settings = () => {
  const { disconnect, publicKey } = useWallet();
  const { setEndpoint, env, endpoint } = useConnectionConfig();
  const { setVisible } = useWalletModal();
  const open = React.useCallback(() => setVisible(true), [setVisible]);
  const { setModal } = useModal();

  const handleConnect = React.useCallback(() => {
    setModal(ModalEnum.WALLET);
    setVisible(true);
  }, [setModal, setVisible]);

  const connectedActions = [
    {
      click: async () => {
        if (publicKey) {
          await navigator.clipboard.writeText(publicKey.toBase58());
          notify({
            message: 'Wallet update',
            description: 'Address copied to clipboard',
          });
        }
      },
      innerNarrow: () =>
        `Copy Address (${publicKey && shortenAddress(publicKey.toBase58())})`,
      inner: function ConnectedWalletCopyC() {
        return (
          <React.Fragment>
            <CopyOutlined />
            {publicKey && shortenAddress(publicKey.toBase58())}
          </React.Fragment>
        );
      },
    },
    {
      click: open,
      inner: () => 'Change\u00A0Wallet',
    },
    {
      click: () => disconnect().catch(),
      inner: () => `Disconnect\u00A0(${env})`,
      expandedExtra: {
        // these are interepreted as props. TODO: specific types
        color: 'error' as any,
        variant: 'contained' as any,
      },
    },
  ];

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!publicKey && (
        <React.Fragment>
          <FormControl variant="standard" style={{ minWidth: '10ch' }}>
            <Select
              id="connected-env-select"
              onChange={e => {
                setEndpoint(e.target.value);
              }}
              value={endpoint}
            >
              {ENDPOINTS.map(({ name, endpoint }) => (
                <MenuItem key={name} value={endpoint}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Link underline="none">
            <Button
              variant="contained"
              onClick={handleConnect}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Connect
            </Button>
          </Link>
        </React.Fragment>
      )}
      {publicKey &&
        connectedActions.map((a, idx) => {
          return (
            <Button
              key={idx}
              variant="outlined"
              onClick={a.click}
              style={{ backgroundColor: 'black', color: 'white' }}
              {...a.expandedExtra}
            >
              {a.inner()}
            </Button>
          );
        })}
    </Stack>
  );
};
