import PropTypes from 'prop-types';
import React from 'react';
import { Image, Modal, View } from 'react-native';
import styles from './style/AvatarModal';
import IconButton from '../../components/button/IconButton';

const AvatarModal = props => (
  <Modal
    visible={props.visible}
    transparent
    animationType="fade"
    onRequestClose={props.close}
  >
    <View
      style={styles.background}
    >
      <Image
        source={{ uri: props.image }}
        style={styles.image}
      />

      <View
        style={styles.buttonLayout}
      >
        {props.canEdit && (
          <IconButton
            name="edit"
            onPress={props.changeAvatar}
          />
        )}

        <IconButton
          name="cancel"
          onPress={props.close}
        />
      </View>
    </View>
  </Modal>
);

AvatarModal.defaultProps = {
  visible: false,
  canEdit: false,
};

AvatarModal.propTypes = {
  visible: PropTypes.bool,
  canEdit: PropTypes.bool,
  image: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
};

export default AvatarModal;
