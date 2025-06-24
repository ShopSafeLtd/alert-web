import React from 'react';

import View from './AuthoriseTodo.view';
import useTodo from './useAuthoriseTodo';

const AuthoriseTodo = ({
  id,
  onClose,
}: {
  id: null | string;
  onClose: () => void;
}) => {
  const { loading, onAuthorisedTodo, saving, todo } = useTodo({
    id,
    onClose,
  });

  return (
    <View
      loading={loading}
      onAuthorisedTodo={onAuthorisedTodo}
      onClose={onClose}
      saving={saving}
      todo={todo}
    />
  );
};

export default AuthoriseTodo;
