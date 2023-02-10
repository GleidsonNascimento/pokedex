import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {}
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);