/**
 *
 * FesModal
 *
 */
import React, { memo } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import styled from 'styled-components/macro';

interface Props {
  buttonLabel?: string;
  className?: string;
  title?: string;
  children?: any;
  onToggle?: any;
  isOpen?: any;
  footer?: any;
}

export const FesModal = memo((props: Props) => {
  const {
    buttonLabel,
    className,
    title,
    children,
    onToggle,
    isOpen,
    footer,
  } = props;

  // const [modal, setModal] = useState(false);
  // const toggle = useCallback(() => setModal(!modal), [modal]);

  return (
    <Div>
      {/* <Button color="danger" onClick={onToggle}>
        {buttonLabel}
      </Button> */}
      <Modal isOpen={isOpen} toggle={onToggle} className={className}>
        <ModalHeader toggle={onToggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {!!footer && <ModalFooter>{footer}</ModalFooter>}
      </Modal>
    </Div>
  );
});

const Div = styled.div``;
