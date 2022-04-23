import { Select } from '@chakra-ui/react';

export default function Networks() {
  return (
    <Select>
      <option default value="Optimism">
        Optimism
      </option>
      <option value="Boba">Boba</option>
      <option value="Arbitrum">Arbitrum</option>
    </Select>
  );
}
