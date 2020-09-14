
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
      {status !== "success" && (
        <React.Fragment>
          <input
            ref={node => (email = node)}
            type="email"
            placeholder="Your email"
          />
          <button onClick={submit}>
            Join!
          </button>
        </React.Fragment>
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
      {!status && (
        <p>(Exclusive updates/sermons)</p>
      )}
    </div>
  );
};

const CTA = () => {
  return (
    <div id="cta">
      <div id="decorative-baby">
        <HolySpaceBabySvg />
      </div>

      <div className="layout-center">
        <p>Thursdays 8pm CT</p>
        <p>Starting 9/24</p>
        <p>Be reborn</p>
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

