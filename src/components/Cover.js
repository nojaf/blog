﻿import TimeAgo from "react-timeago/lib";
import {Link} from "gatsby";
import twitterIcon from "../components/images/twitter-nojaf-blog.svg";
import React from "react";

const Cover = ({path, title, image, tags, date, backgroundPosition}) => {
    const url = `https://blog.nojaf.com/${path}`
    const twitterText = `${title} by @verdonckflorian`;
    const style = {backgroundImage: `url(${image})`}
    if (backgroundPosition) { style.backgroundPosition = 'initial' }

    return (
        <header style={style} className="cover">
            <div className="inner"></div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="d-none d-md-block col col-md-3 col-lg-2 meta">
                            {date && <strong>Published</strong>}
                            {date && <TimeAgo date={date} className={'timeago'}/>}
                            {tags && <strong className="pt-2">Tags</strong>}
                            {tags && <ul className="list-unstyled">{tags.map((t, i) => <li key={i}><Link key={t} to={`/tag/${t}/`}>{t}</Link></li>)}</ul>}
                        </div>
                        <div className="col col-md-9 col-lg-10 d-flex align-content-center flex-wrap">
                            <div className="py-5 ms-md-5">
                                <h1>{title}</h1>
                                {path &&
                                    <a className="share d-flex align-items-center pt-1"
                                       href={`https://twitter.com/share?text=${twitterText};url=${url}`}>
                                        <span>Share this on&nbsp;</span>
                                        <img src={twitterIcon} alt="Twitter icon"/>
                                    </a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Cover