
import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import HolySpaceBabySvg from "../../svg/holy-space-baby.inline.svg"



const MAILCHIMP_URL='https://barefootfunk.us18.list-manage.com/subscribe/post?u=47e36bf28611ddfce598ffc89&id=8fa2164a2f';

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
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
      <p>Join the mailing list for reminders and bonus content:</p>
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

const CTA = (props) => {
  return (
    <div id="cta">
      <div id="decorative-baby">
        <HolySpaceBabySvg />
      </div>

      <div className="layout-center">
        {typeof props.children !== 'undefined' ? props.children : (<React.Fragment>
          <p style={{ display: 'block', margin: '10px auto'}}>The world's first interactive electric trombone livestream adventure.</p>
          <p style={{ display: 'block', margin: '10px auto'}}>Return here just before 7p CST every Thursday.</p>
        </React.Fragment>)}
        <div className="mailing-list">
        <MailchimpSubscribe
            url={MAILCHIMP_URL}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={formData => subscribe(formData)}
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

