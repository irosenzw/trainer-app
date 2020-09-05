import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import {
  connect,
  useSelector,
  shallowEqual,
  useDispatch,
} from 'react-redux';
import Wrapper from '../Components/Wrapper';
import {
  ListComponent,
  ListRowComponent,
} from '../Components/List/ListComponent';
import { COLOR_SCHEME } from '../utils/Constants';
import { SettingsType } from '../utils/types';
import WorkoutButton from '../Components/Buttons/WorkoutButton';
import { storeObject } from '../storage/storage';

type settingsFieldInputProps = {
  navigation: any;
  initialValue: string | number;
  settingsPath: { topic: string; key: string };
  isNumber: boolean;
  onChange: (topic: string, key: string, v: any) => void;
};

const SettingsFieldInput: React.FC<settingsFieldInputProps> = ({
  navigation,
  initialValue,
  onChange,
  settingsPath,
  isNumber = false,
}) => {
  const [val, setVal] = React.useState(initialValue);
  const { topic, key } = settingsPath;

  const validateInput = (newText: any) => {
    if (isNumber && isNaN(newText)) {
      return;
    }

    setVal(newText);
    onChange(topic, key, newText);
  };

  return (
    <>
      {isNumber && (
        <TextInput
          style={styles.text}
          keyboardType="numeric"
          value={`${val}`}
          onChangeText={(v: string) => validateInput(v)}
        />
      )}
      {!isNumber && (
        <WorkoutButton
          style={{}}
          textStyle={styles.text}
          text={`${initialValue}`}
          onClick={() =>
            navigation.navigate('SoundsPicker', {
              sounds: [initialValue],
              backTo: 'Settings',
              singleValue: true,
              settingsPath,
            })
          }
        />
      )}
    </>
  );
};

type SettingPageProps = {
  navigation: any;
  route: any;
};

const SettingsPage: React.FC<SettingPageProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch();
  const getSettings = useSelector(
    (state: any) => state.trainerState.Settings,
    shallowEqual,
  );
  const [localSettings, setLocalSettings] = React.useState(
    getSettings,
  );

  const updateSettings = (
    topic: string,
    key: string,
    value: string,
  ) => {
    localSettings[topic][key].value = value;
    setLocalSettings(Object.assign({}, localSettings));
    dispatch({ type: 'SET_SETTINGS', payload: localSettings });
    storeObject('Settings', localSettings);
  };

  const sounds = route.params?.sounds;
  const settingsPath = route.params?.settingsPath;
  let topic;
  let key;
  if (settingsPath) {
    topic = settingsPath.topic;
    key = settingsPath.key;
  }

  console.log('localSettings', localSettings);

  if (
    sounds &&
    settingsPath &&
    localSettings[topic][key].value !== sounds[0]
  ) {
    updateSettings(topic, key, sounds[0]);
  }

  return (
    <Wrapper title="Settings" backNav={() => navigation.goBack()}>
      <ListComponent>
        {Object.keys(localSettings).map((topic) => (
          <View key={`${topic}-settings`}>
            <ListRowComponent
              key={`${topic}-settings`}
              keyProp={`${topic}-settings`}
            >
              <Text style={styles.topic}>
                {topic.toLocaleUpperCase()}
              </Text>
            </ListRowComponent>
            {Object.keys(localSettings[topic]).map((k: string) => (
              <ListRowComponent key={k} keyProp={k}>
                <View style={styles.keyView}>
                  <Text style={styles.text}>
                    {localSettings[topic][k].type ===
                    SettingsType.SECONDS
                      ? `${localSettings[topic][k].preview} (sec)`
                      : `${localSettings[topic][k].preview}`}
                  </Text>
                </View>
                <View style={styles.valueView}>
                  <SettingsFieldInput
                    navigation={navigation}
                    initialValue={localSettings[topic][k].value}
                    onChange={updateSettings}
                    settingsPath={{ topic, key: k }}
                    isNumber={
                      localSettings[topic][k].type ===
                        SettingsType.NUMBER ||
                      localSettings[topic][k].type ===
                        SettingsType.SECONDS
                    }
                  />
                </View>
              </ListRowComponent>
            ))}
          </View>
        ))}
      </ListComponent>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  topic: {
    color: COLOR_SCHEME.orange,
    fontSize: 25,
  },
  text: {
    color: COLOR_SCHEME.white,
    fontSize: 20,
  },
  keyView: {
    width: '60%',
    marginStart: 25,
  },
  valueView: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
    marginEnd: 15,
  },
});

export default SettingsPage;
