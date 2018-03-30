import React from 'react';
import PropTypes from 'prop-types';

class ClassicEditor extends React.Component {
  static get propTypes() {
    return {
      options: PropTypes.object,
      children: PropTypes.node,
      onChange: PropTypes.func,
    }
  };

  static get defaultProps() {
    return {
      options: {},
    }
  };

  componentDidMount() {
    const ClassicEditorBuild = require('@ckeditor/ckeditor5-build-classic');
    this.editor = ClassicEditorBuild.create(this.editorArea);
    if (typeof this.props.onChange === 'function') {
      this.editor.model.document.on('change', () => {
        this.props.onChange(this.editor.getData());
      });
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  render() {
    return <div ref={ref => this.editorArea = ref} style={{ display: 'none' }}>{this.props.children}</div>;
  }
}

export default ClassicEditor;
