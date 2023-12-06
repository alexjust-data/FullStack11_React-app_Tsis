import PropTypes from 'prop-types';
import clsx from 'clsx';

import './Textarea.css';
import { forwardRef } from 'react';

const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <div className={clsx('textarea', className)}>
      <textarea className="textarea-input" {...props} ref={ref} />
    </div>
  );
});

Textarea.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.object,
};

export default Textarea;