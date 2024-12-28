import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useModalStore } from '@/shared/model/modalStore';
import { LoginModal, ChattingModal, ContactModal } from '@/widgets';

const MODAL_COMPONENTS = {
  login: LoginModal,
  chatting: ChattingModal,
  contact: ContactModal,
} as const;

const ModalProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, modalKey, selectedUser, close } = useModalStore(
    useShallow(state => ({
      modalKey: state.modalKey,
      isOpen: state.isOpen,
      selectedUser: state.selectedUser,
      close: state.actions.close,
    })),
  );

  const ModalComponent = modalKey ? MODAL_COMPONENTS[modalKey] : null;

  const renderModal = () => {
    if (!isOpen || !ModalComponent) return null;

    // ContactModal인 경우 username props 전달
    if (modalKey === 'contact') {
      return <ModalComponent isOpen={isOpen} onClose={close} username={selectedUser} />;
    }

    // 다른 모달의 경우 기존대로 렌더링
    return <ModalComponent isOpen={isOpen} onClose={close} />;
  };

  useEffect(() => {
    const root = document.getElementsByTagName('html');
    if (!root) return;
    if (isOpen) {
      root[0].classList.add('modal-open');
    } else {
      root[0].classList.remove('modal-open');
    }

    return () => {
      root[0].classList.remove('modal-open');
    };
  }, [isOpen]);

  return (
    <>
      {children}
      {renderModal()}
    </>
  );
};

export default ModalProvider;
