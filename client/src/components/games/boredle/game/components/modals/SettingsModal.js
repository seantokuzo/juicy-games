import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useBoredleContext } from '../../../../../../context/boredle-context/boredleContext'

const SettingsModal = () => {
  const {
    darkMode,
    toggleDarkMode,
    highContrastMode,
    toggleHighContrastMode,
    toggleSettings,
    hardMode,
    toggleHardMode
    // handleNewGameWarning
  } = useBoredleContext()

  const settingsTitleDiv = (
    <div className="boredle__setting-title">
      <h3 className="boredle__settings-title modal__title subtitle">SETTINGS</h3>
      <AiFillCloseCircle className="modal__close" onClick={toggleSettings} />
    </div>
  )

  const isTogglerOn = (mode) => {
    if (mode) {
      return 'boredle__settings-toggler-inner boredle__settings-toggler-inner-on'
    } else return 'boredle__settings-toggler-inner'
  }

  const createSetting = (name, info, mode, toggler) => {
    return (
      <div
        className={
          info
            ? 'boredle__settings-setting'
            : 'boredle__settings-setting boredle__settings-setting-dark'
        }
      >
        <div className="boredle__settings-setting-top">
          <h5 className="boredle__settings-setting-name">{name}</h5>
          <div className="boredle__settings-toggler">
            <div className={isTogglerOn(mode)} onClick={toggler}>
              <div className="boredle__settings-toggler-circle"></div>
            </div>
          </div>
        </div>
        <div className="boredle__settings-setting__details">
          {info && (
            <p className="boredle__settings-setting__details-info">{info}</p>
          )}
          {name === 'Hard Mode' && (
            <p className="boredle__settings-setting__details-info">
              Cannot be changed after first guess
            </p>
          )}
        </div>
      </div>
    )
  }

  const hardModeSettings = createSetting(
    'Hard Mode',
    'Guesses must include revealed letters',
    hardMode,
    toggleHardMode
  )

  const darkModeSettings = createSetting(
    'Dark Theme',
    '',
    darkMode,
    toggleDarkMode
  )

  const highContrastSettings = createSetting(
    'High Contrast Mode',
    'Enhances color accessibility',
    highContrastMode,
    toggleHighContrastMode
  )

  const feedbackSettings = (
    <div className="boredle__settings-feedback">
      <h6 className="modal__title subtitle">Feedback</h6>
      <div className="boredle__settings-feedback-links">
        <button className="boredle__settings-feedback-btn btn fs-boredle">
          <a
            href="#"
            // href="https://github.com/seantokuzo/<<REPO>>/issues"
            className="boredle__settings-feedback-link boredle__settings-feedback-link-email"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </button>
        <p className="boredle__settings-feedback-line">|</p>
        <button className="boredle__settings-feedback-btn btn fs-boredle">
          <a
            href="https://twitter.com/seantokuzo"
            className="boredle__settings-feedback-link boredle__settings-feedback-link-twitter"
            target="_blank"
            rel="noreferrer noopener"
          >
            Twitter
          </a>
        </button>
      </div>
    </div>
  )
  // const newGameButton = (
  //   <div className="btn boredle__settings__btn" onClick={handleNewGameWarning}>
  //     <h3 className="btn--text">NEW GAME</h3>
  //   </div>
  // )

  return (
    <div className="boredle__modal--dimmer">
      <div className="boredle__modal boredle__settings bg-theme">
        {settingsTitleDiv}
        {hardModeSettings}
        {darkModeSettings}
        {highContrastSettings}
        {feedbackSettings}
        {/* {newGameButton} */}
      </div>
    </div>
  )
}

export default SettingsModal
