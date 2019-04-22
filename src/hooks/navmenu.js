import { useState, useEffect } from 'react';

export default () => {
  const [anchorEl, setTarget] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(!!anchorEl), [anchorEl]);
  const onClick = ({ target }) => setTarget(target);
  const onClose = () => setTarget(null);
  return {
    open, anchorEl, onClick, onClose,
  };
};
