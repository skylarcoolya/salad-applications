import React, { Component } from 'react'
import withStyles, { WithStyles } from 'react-jss'
import { SaladTheme } from '../../../SaladTheme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faClone, faTimes } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

export class MenuItem {
  constructor(public readonly name: string, public readonly onClick: () => void) {}
}

const styles = (theme: SaladTheme) => ({
  container: {
    color: theme.lightGreen,
    height: '2rem',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    paddingLeft: '1rem',
    margin: 0,
    '-webkit-app-region': 'drag',
  },
  bottomBorder: {
    borderBottom: `1px solid ${theme.green}`,
  },
  leftItems: {
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    fontFamily: 'sharpGroteskBook19',
    fontSize: theme.small,
    paddingRight: '1rem',
  },
  buttons: {
    padding: '0 .75rem',
    '-webkit-app-region': 'none',
    height: '2rem',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  menuItem: {
    color: theme.mediumGreen,
    '-webkit-app-region': 'none',
    padding: '.5rem 1rem',
    fontFamily: 'sharpGroteskLight25',
    fontSize: theme.small,
    letterSpacing: '1.3px',
    cursor: 'pointer',
  },
  closeButton: {
    '&:hover': {
      opacity: 1,
      backgroundColor: 'darkred',
    },
  },
})

interface Props extends WithStyles<typeof styles> {
  showWindowActions?: boolean
  bottomBorder?: boolean
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  menuItems?: MenuItem[]
}

class _Titlebar extends Component<Props> {
  handleClose = () => {
    const { onClose } = this.props

    if (onClose) onClose()
  }

  handleMinimize = () => {
    const { onMinimize } = this.props

    if (onMinimize) onMinimize()
  }

  handleMaximize = () => {
    const { onMaximize } = this.props

    if (onMaximize) onMaximize()
  }

  render() {
    const { showWindowActions, menuItems, bottomBorder, classes } = this.props
    return (
      <div className={classnames(classes.container, { [classes.bottomBorder]: bottomBorder })}>
        <div className={classes.leftItems}>
          <div className={classes.title}>Salad</div>
          {menuItems &&
            menuItems.map(x => (
              <div key={x.name} className={classes.menuItem} onClick={() => x.onClick()}>
                {x.name}
              </div>
            ))}
        </div>
        {showWindowActions && (
          <>
            <div onClick={this.handleMinimize}>
              <FontAwesomeIcon size="xs" className={classes.buttons} icon={faMinus} />
            </div>
            <div onClick={this.handleMaximize}>
              <FontAwesomeIcon size="xs" className={classes.buttons} icon={faClone} />
            </div>
            <div onClick={this.handleClose}>
              <FontAwesomeIcon size="xs" className={classnames(classes.closeButton, classes.buttons)} icon={faTimes} />
            </div>
          </>
        )}
      </div>
    )
  }
}

export const Titlebar = withStyles(styles)(_Titlebar)
