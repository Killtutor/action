import PropTypes from 'prop-types';
import React from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';
import labels from 'universal/styles/theme/labels';
import {ACTIVE, STUCK, DONE, FUTURE} from 'universal/utils/constants';
import {cardBorderTop} from 'universal/styles/helpers';
import {trimString} from 'universal/utils';
import isProjectPrivate from 'universal/utils/isProjectPrivate';

const SummaryCard = (props) => {
  const {
    content,
    status,
    tags,
    styles
  } = props;
  const isPrivate = isProjectPrivate(tags);
  const rootStyles = css(
    styles.root,
    styles[status],
    isPrivate && styles.isPrivate
  );

  const trimmedContent = trimString(content, 40);

  return (
    <div className={rootStyles}>
      <div className={css(styles.content)}>
        {trimmedContent}
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  content: PropTypes.string,
  status: PropTypes.oneOf(labels.projectStatus.slugs),
  styles: PropTypes.object,
  tags: PropTypes.array
};

const styleThunk = () => ({
  root: {
    backgroundColor: '#fff',
    border: `1px solid ${ui.cardBorderColor}`,
    borderRadius: ui.cardBorderRadius,
    maxWidth: '20rem',
    minHeight: '5rem',
    paddingTop: '.1875rem',
    position: 'relative',
    width: '100%',

    '::after': {
      ...cardBorderTop
    }
  },

  content: {
    padding: '.5rem'
  },

  [ACTIVE]: {
    '::after': {
      color: labels.projectStatus[ACTIVE].color
    }
  },

  [STUCK]: {
    '::after': {
      color: labels.projectStatus[STUCK].color
    }
  },

  [DONE]: {
    '::after': {
      color: labels.projectStatus[DONE].color
    }
  },

  [FUTURE]: {
    '::after': {
      color: labels.projectStatus[FUTURE].color
    }
  },

  isPrivate: {
    backgroundColor: appTheme.palette.light50l
  }
});

export default withStyles(styleThunk)(SummaryCard);
