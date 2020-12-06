import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { COLOR_SCHEME } from '../../utils/Constants';

type OverwriteFileModalProps = {
  onClose: () => void;
  onSave: () => void;
  isVisible: boolean;
};

const OverrideFileModal: React.FC<OverwriteFileModalProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [modalVisible, setModalVisible] = React.useState(isVisible);

  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      isVisible={modalVisible}
      animationOut="fadeOutDown"
      animationIn="fadeInUp"
      backdropTransitionOutTiming={0}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Override ?</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onSave}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Yes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLOR_SCHEME.black,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 30,
    marginBottom: 12,
    color: COLOR_SCHEME.white,
  },
  buttonText: {
    fontSize: 25,
    marginBottom: 12,
    color: COLOR_SCHEME.white,
  },
  button: {
    paddingTop: 25,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default OverrideFileModal;
