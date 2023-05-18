import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

const ContactsList = ({ contacts, title, onDeleteContact, children }) => {
  return (
    <>
      <h2 className={css.title}>{title}</h2>
      {children}
      <ul className={css.list}>
        {contacts.map(contact => (
          <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span>{contact.number}</span>
            <button
              type="button"
              className={css.deleteButton}
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default ContactsList;
