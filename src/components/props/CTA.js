
import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import HolySpaceBabySvg from "../../svg/holy-space-baby.inline.svg"



const MAILCHIMP_URL='https://barefootfunk.us18.list-manage.com/subscribe/post?u=47e36bf28611ddfce598ffc89&id=8fa2164a2f';

// a basic form
const CustomForm = ({ status, message, onValidated, descriptionText }) => {
  let email, name;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    });

  return (
    <div
    >
      <div style={{fontSize: '0.8em'}}>{descriptionText ? descriptionText : 'Mailing list'}</div>
      {status !== "success" && (
        <div id='mailing-list-form'>
          <input
            ref={node => (email = node)}
            type="email"
            placeholder="Your email"
          />
          <button onClick={submit}>
            Join!
          </button>
        </div>
      )}
      {status === "sending" && <div className="mailing-list-alert -sending">sending...</div>}
      {status === "error" && (
        <div className="mailing-list-alert -error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div className="mailing-list-alert -success"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {/* {!status && (
        <p>(reminders and exclusive sermons)</p>
      )} */}
    </div>
  );
};
/* <a href="https://add.eventable.com/subscribe/5f8edeb953314b00158b2ff5/" data-categories="all" class="eventable-link" target="_blank" data-key="5f8edeb953314b00158b2ff5" data-style="1">Add to Calendar</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://plugins.eventable.com/eventable.js";fjs.parentNode.insertBefore(js, fjs);}}(document, "script", "eventable-script");</script> */

const CTA = (props) => {
  const addToCalScript = `<a href="https://add.eventable.com/events/5f8edeb953314b00158b2ff5/${props.calEventId}/" data-event="${props.eventId}" class="eventable-link" target="_blank" data-key="5f8edeb953314b00158b2ff5" data-style="1">Add ${props.nextCeremonyDate} ceremony to Calendar</a>` //<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://plugins.eventable.com/eventable.js";fjs.parentNode.insertBefore(js, fjs);}}(document, "script", "eventable-script");</script>
  return (
    <div id="cta">
      <div id="decorative-baby">
        <HolySpaceBabySvg />
      </div>

      <div className="layout-bottom-edge">
        {typeof props.children !== 'undefined' && props.children}
        <div className="add-to-cal text-box"><span dangerouslySetInnerHTML={{ __html: addToCalScript }} /></div>
        <div className="mailing-list">
          <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={formData => subscribe(formData)}
                descriptionText={props.mailingListText}
              />
            )}
          />
        </div>
      </div>
      
      {/* <div id="weekly-promise">
        New visions, music and more weekly.
      </div> */}

    </div>
  )
}

export default CTA;

