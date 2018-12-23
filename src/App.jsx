import React from 'react';
import { connect } from "react-redux";
import { actionKeyPress, actionAddKey, actionKeyUp } from './Store';
import "./css/App.min.css";
import soundA from "./sounds/a.mp3";
import soundS from "./sounds/s.mp3";
import soundD from "./sounds/d.mp3";
import soundQ from "./sounds/q.mp3";
import soundW from "./sounds/w.mp3";
import soundE from "./sounds/e.mp3";
import soundZ from "./sounds/z.mp3";
import soundX from "./sounds/x.mp3";
import soundC from "./sounds/c.mp3";

const BOARD_KEYS = [
  {
    key: "Q",
    url: soundQ,
    id: "soundQ"
  },
  {
    key: "W",
    url: soundW,
    id: "soundW"
  },
  {
    key: "E",
    url: soundE,
    id: "soundE"
  },
  {
    key: "A",
    url: soundA,
    id: "soundA"
  },
  {
    key: "S",
    url: soundS,
    id: "soundS"
  },
  {
    key: "D",
    url: soundD,
    id: "soundD"
  },
  {
    key: "Z",
    url: soundZ,
    id: "soundZ"
  },
  {
    key: "X",
    url: soundX,
    id: "soundX"
  },
  {
    key: "C",
    url: soundC,
    id: "soundC"
  }
];

const DrumPad = ({ shouldPlay, classes, drumKey, keySound, onClickHandler, onEndHandler, id }) => (
  <div
    className={classes}
    onClick={onClickHandler}
    id={id}
  >
    {drumKey.toUpperCase()}
    {shouldPlay? (
      <audio className="clip" src={keySound} id={drumKey} onEnded={onEndHandler} autoPlay/>
    ) : 
    (<audio className="clip" id={drumKey}/>) //Just added in the codepen
    }
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  shouldPlay: state.keyPress === ownProps.drumKey.toUpperCase(),
  classes: state.keyPress === ownProps.drumKey.toUpperCase() ? "drum-pad drum-active": "drum-pad"
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickHandler: () => {
    dispatch(actionKeyUp());
    setTimeout(() => dispatch(actionKeyPress(ownProps.drumKey)), 100);    
  },
  onEndHandler: () => dispatch(actionKeyUp())
});

const DrumPadContainer = connect(mapStateToProps, mapDispatchToProps)(DrumPad);

let Display = ({ audioPlaying }) => (
  <div id="display">
    <p>{audioPlaying}</p>
  </div>
)

Display = connect(state => ({audioPlaying: state.audioPlaying}), null)(Display);

let App = ({ createKey, handleKeyPress }) => (
  <div className="grid" onKeyPress={handleKeyPress} tabIndex={0}>
    {/* To listen a keyPress event it's necessary to set tabIndex. */}
    <div id="drum-machine">
      <h1 className="title">Drum Machine</h1>
      {BOARD_KEYS.map((boardKey, i) => {
        createKey(boardKey.key, boardKey.id);
        return (
          <DrumPadContainer
            key={i}
            drumKey={boardKey.key}
            keySound={boardKey.url}
            id={boardKey.id}
          />
        );
      })}
      <Display />
    </div>
    <footer>
      <a href="https://github.com/ValentinTapiaTorti" target="_blank">
        <span class="text">Valentin TT.</span>
        <span class="line -right" />
        <span class="line -top" />
        <span class="line -left" />
        <span class="line -bottom" />
      </a>
    </footer>
  </div>
);

App = connect(
  null,
  dispatch => ({
    createKey: (newKey, newAudio) => dispatch(actionAddKey(newKey, newAudio)),
    handleKeyPress: event => {
      let keyPressed = event.key;
      dispatch(actionKeyUp());
      setTimeout(() => dispatch(actionKeyPress(keyPressed)), 100);
    }
  })
)(App);

export default App;