import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Wrapper from '../Components/Wrapper';
import {
  ListComponent,
  ListRowComponent,
} from '../Components/List/ListComponent';
import { COLOR_SCHEME } from '../utils/Constants';
import { SettingsType } from '../utils/types';
import WorkoutButton from '../Components/Buttons/WorkoutButton';
import { storeObject } from '../storage/storage';
import { settings } from '../utils/default-settings';

type settingsFieldInputProps = {
  navigation: any;
  initialValue: string | number;
  settingsPath: { topic: string; key: string };
  isNumber: boolean;
  onChange: (topic: string, key: string, v: any) => void;
};

const updateSettings = (loadedSettings: { [key: string]: any }) => {
  const newSettings: { [key: string]: any } = {};

  // Go over all topics
  Object.keys(settings).forEach((topic) => {
    if (settings[topic]) {
      newSettings[topic] = {};
      // Go over all keys in topics inside default-settings
      Object.keys(settings[topic]).forEach((key) => {
        if (loadedSettings[topic] && loadedSettings[topic][key]) {
          // first use user's saved settings
          newSettings[topic][key] = loadedSettings[topic][key];
        } else if (settings[topic][key]) {
          // use default-settings as this is a new setting
          newSettings[topic][key] = settings[topic][key];
        }
      });
    }
  });

  return newSettings;
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
    if (isNumber && newText === '') {
      setVal(initialValue);
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
          keyboardType="phone-pad"
          value={`${val}`}
          onFocus={() => setVal('')}
          onBlur={() => validateInput(val)}
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
  let getSettings = useSelector(
    (state: any) => state.trainerState.Settings,
    shallowEqual,
  );

  const [localSettings, setLocalSettings] = React.useState(
    updateSettings(getSettings),
  );

  const storeModefiledSettings = () => {
    setLocalSettings(Object.assign({}, localSettings));
    dispatch({ type: 'SET_SETTINGS', payload: localSettings }); // update local state
    storeObject('Settings', localSettings); // update persistant settings object
  };

  const modifySettings = (
    topic: string,
    key: string,
    value: string,
  ) => {
    localSettings[topic][key].value = value;
    storeModefiledSettings();
  };

  const sounds = route.params?.sounds;
  const settingsPath = route.params?.settingsPath;
  let topic;
  let key;
  if (settingsPath) {
    topic = settingsPath.topic;
    key = settingsPath.key;
  }

  if (
    sounds &&
    settingsPath &&
    localSettings[topic][key].value !== sounds[0]
  ) {
    modifySettings(topic, key, sounds[0]);
  }

  return (
    <Wrapper
      title="Settings"
      navigation={navigation}
      hideSettingsBtn={true}
    >
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
                    onChange={modifySettings}
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
