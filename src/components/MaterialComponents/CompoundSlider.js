// @flow
import Slider from 'react-compound-slider';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Rail, Handle, Track } from './SliderComponents';

const style = () => ({
  root: {
    height: 120,
    width: '100%',
  },
  slider: {
    position: 'relative',
    width: '100%',
  },
});


type Props = {
  classes: any,
  onUpdate: (any) => void,
  onChange: (any) => void,
  defaultValue: number,
  min: number,
  max: number,
  step: number,
}

class CompoundSlider extends React.Component<Props> {
  onUpdate = (updates) => {
    this.props.onUpdate({
      target:
        {
          value: updates[0],
        },
    });
  };

  onChange = (values) => {
    this.props.onChange({
      target:
        {
          value: values[0],
        },
    });
  };

  render() {
    const { props: { classes } } = this;
    return (
      <div className={classes.root}>

        <Slider
          mode={2}
          step={this.props.step}
          domain={[this.props.min, this.props.max]}
          className={classes.slider}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={[this.props.defaultValue]}
        >

          <Slider.Rail>
            {({ getRailProps }) => <Rail getRailProps={getRailProps} />}
          </Slider.Rail>

          <Slider.Handles>
            {({ handles, getHandleProps }) => (
              <div>
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[this.props.min, this.props.max]}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Slider.Handles>

          <Slider.Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Slider.Tracks>
        </Slider>

      </div>
    );
  }
}

export default withStyles(style)(CompoundSlider);
