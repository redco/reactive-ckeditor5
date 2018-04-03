import React from 'react';
import PropTypes from 'prop-types';

class ClassicEditor extends React.Component {
  static get propTypes() {
    return {
      editable: PropTypes.bool,
      options: PropTypes.object,
      children: PropTypes.node,
      onChange: PropTypes.func,
    }
  };

  static get defaultProps() {
    return {
      editable: true,
      options: {},
    }
  };

  async componentDidMount() {
    const ClassicEditorBuild = require('@ckeditor/ckeditor5-build-classic');
    this.editor = await ClassicEditorBuild.create(this.editorArea);
    if (typeof this.props.onChange === 'function') {
      this.editor.model.document.on('change', () => {
        this.props.onChange(this.editor.getData());
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.props.editable && this.editor) {
      this.editor.isReadOnly = !nextProps.editable;
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  render() {
    return (
      <div ref={ref => this.editorArea = ref} style={{ display: 'none' }}>
        {this.props.children}
      </div>
    );
  }
}

export default ClassicEditor;
