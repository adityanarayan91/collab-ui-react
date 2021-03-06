import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Icon,
  List,
  ListItem,
  ListItemSection,
  Button,
  Popover,
} from '@collab-ui/react';
import { omit, uniqueId } from 'lodash';

/**
 * @category containers
 * @component list-item
 * @variations collab-ui-react
 */

class SpaceListMeeting extends React.PureComponent {
  static displayName = 'SpaceListMeeting';

  state = {
    id: uniqueId(this.props.id && `${this.props.id}-` || 'cui-space-list-meeting-'),
  }

  handleButtonClick = e => {
    const { buttonOnClick } = this.props;

    buttonOnClick && buttonOnClick(e);

    e.stopPropagation();
  }

  render() {
    const {
      attendees,
      buttonLabel,
      childrenLeft,
      childrenRight,
      className,
      header,
      isBold,
      meetingType,
      subheader,
      title,
      ...props
    } = this.props;
    const {
      id
    } = this.state;

    const otherProps = omit({...props}, ['buttonOnClick']);

    const getTitle =
      (!title && typeof header === 'string')
        ? header
        : title;

    const getLeftSection = () => {
      switch(meetingType) {
        case 'group': return <Avatar title={getTitle} alt={getTitle} type='group'/>;
        case 'number': return <Avatar title='#' alt={getTitle}/>;
        case 'device': return <Avatar icon={<Icon name='spark-board_16' />} alt={getTitle} />;
        default: return <Avatar title={getTitle} alt={getTitle}/> ;
      }
    };

    const getPopoverContent = (
      <List>
        {
          attendees.map((ele, idx) => (
            <ListItem key={`attendee-${idx}`}>
              <ListItemSection position='left'>
                {
                  ele.node
                    ? ele.node
                    : (
                      <Avatar 
                        size='small'
                        title={ele.title}
                        alt={ele.alt || ele.title}
                        src={ele.src || ''}
                        type='group'
                      />
                    )
                }
              </ListItemSection>
              <ListItemSection position='center'>
                <div className='cui-list-item__header'>
                  {ele.title}
                </div>
              </ListItemSection>
            </ListItem>
          ))
        }
      </List>
    );

    const children = (
      [
        <ListItemSection key='child-0' position='left'>
          {childrenLeft || getLeftSection()}
        </ListItemSection>,
        <ListItemSection key='child-1' position='center'>
          <div className='cui-list-item__header'>
            {header}
          </div>
          <div className='cui-list-item__subheader'>
            {subheader}
          </div>
        </ListItemSection>,
        <ListItemSection key='child-2' position='right'>
          {childrenRight || attendees.length > 0 && 
            <Popover 
              content={getPopoverContent}
              direction='bottom-center'
              targetOffset={{vertical: 3}}
              isDynamic
              popoverTrigger='Click'
            >
              <span 
                role='button'
                tabIndex={0}
                className='cui-list-item--space-meeting--attendees'
              >
                {attendees.length}
                <Icon name='people_12' />
              </span>
            </Popover>
          }
          {
            buttonLabel 
            &&
            <Button
              color='green'
              ariaLabel={buttonLabel}
              children={buttonLabel}
              onClick={this.handleButtonClick}
            />
          }
        </ListItemSection>
      ]
    );

    return (
      <ListItem
        className={
          'cui-list-item--space-meeting' +
          `${(isBold && ` cui-list-item--unread`) || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        id={id}
        title={getTitle}
        type='space'
        {...otherProps}
      >
        {children}
      </ListItem>
    );
  }
}

SpaceListMeeting.defaultProps = {
  attendees: [],
  buttonLabel: '',
  buttonOnClick: null,
  childrenLeft: null,
  childrenRight: null,
  className: '',
  id: '',
  isBold: false,
  subheader: '',
  title: ''
};

SpaceListMeeting.propTypes = {
  /** Array for Attendees */
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      alt: PropTypes.string,
      src: PropTypes.string,
      node: PropTypes.element
    })
  ),
  /** String for button */
  buttonLabel: PropTypes.string,
  /** OnClick for button */
  buttonOnClick: PropTypes.func,
  /** Children for left section */
  childrenLeft: PropTypes.node,
  /** Children for right section */
  childrenRight: PropTypes.node,
  /** HTML Class for associated input */
  className: PropTypes.string,
  /** ListItem header */
  header: PropTypes.node.isRequired,
  /** HTML ID for associated input */
  id: PropTypes.string,
  /** Header Boolean */
  isBold: PropTypes.bool,
  /** HTML Class for associated input */
  meetingType: PropTypes.oneOf(['', 'group', 'number', 'device']),
  /** ListItem header */
  subheader: PropTypes.node,
  /** ListItem title */
  title: PropTypes.string
};

export default SpaceListMeeting;

/**
* @name Space List Meeting
*
* @category containers
* @component list-item
* @section space-meeting
*
* @js
*
import { List, SpaceListMeeting, Avatar, Icon } from '@collab-ui/react';
import { NavLink } from 'react-router-dom';

export default class SpaceListExamples extends React.PureComponent {

  render() {
    return(
      <div className="medium-5 columns">
        <List style={{backgroundColor: 'rgba(40,40,40,0.72)'}}>
          <SpaceListMeeting 
            buttonLabel='Now'
            attendees={[
              {title: 'Joe Bojangles'},
              {title: 'Joe Boe'},
              {title: 'Joe Coe'},
              {title: 'Joe Doe'},
              {title: 'Joe Foe'},
              {title: 'Joe Goe'},
              {title: 'Joe Joe'},
              {title: 'Joe Koe'},
              {title: 'Joe Loe'},
              {title: 'Joe Moe'},
              {title: 'Joe Noe'},
              {title: 'Joe Poe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            header='Attendees Prop'
            subheader='must be very long long long long long message message' 
          />
          <SpaceListMeeting
            header='isBold(true)'
            subheader='subheader'
            isBold
          />
          <SpaceListMeeting
            buttonLabel='In 5 Min'
            header='MeetingType(group)'
            subheader='subheader'
            meetingType='group'
          />
          <SpaceListMeeting
            buttonLabel='2:25'
            header='MeetingType(number)'
            subheader='subheader'
            meetingType='number'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='MeetingType(device)'
            meetingType='device'
          />
          <SpaceListMeeting
            attendees={[
              {title: 'Joe Boe'},
              {title: 'Moe Moe'},
              {title: 'Toe Toe'}
            ]}
            buttonLabel='30:25'
            header='ChildrenLeft Prop'
            childrenLeft={<Avatar icon={<Icon color='blue' name='mention_12' />} />}
          />
        </List>
      </div>
    );
  }
}
**/
