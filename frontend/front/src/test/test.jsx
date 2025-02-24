import React from 'react';
import './test.css';

function Test() {
    return (
        <div className="test">
            <header className="test-header">
                <div className="test-content">
                    <h1>Fixed Background with Scrolling Content</h1>
                    <p>This is a simple example where the background is fixed, and the content scrolls over it.</p>
                </div>
                <div className="test-scroll-content">
                    <section>
                        <h2>Section 1</h2>
                        <p>Scroll down to see more content...</p>
                    </section>
                    <section>
                        <h2>Section 2</h2>
                        <p>Here is some more content as you scroll.</p>
                    </section>
                </div>

                <div className="test-content">
                    <h1>Fixed Background with Scrolling Content</h1>
                    <p>This is a simple example where the background is fixed, and the content scrolls over it.</p>
                </div>
                <div className="test-scroll-content">
                    <section>
                        <h2>Section 3</h2>
                        <p>Scroll down to see more content...</p>
                    </section>
                    <section>
                        <h2>Section 4</h2>
                        <p>Here is some more content as you scroll.</p>
                    </section>
                    <section>
                        <h2>Section 5</h2>
                        <p>The background image stays in place!</p>
                    </section>
                </div>
            </header>
        </div>
    );
}

export default Test;
