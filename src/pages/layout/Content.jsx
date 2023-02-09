import React from 'react';

const Content = ({children}) => {
    return (
        <div className="content-wrapper">
            <section className="content">
                {children}
            </section>
        </div>
    );
};

export default Content;