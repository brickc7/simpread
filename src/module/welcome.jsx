console.log( "===== simpread option welcome page load =====" )

import '../vender/carousel/carousel.css';
import 'carousel';

import Button  from 'button';

import * as ss from 'stylesheet';

const welcbgcls   = "welcome-bg",
      welcbgclsjq = `.${welcbgcls}`,
      welcbg      = `<div class="${ welcbgcls }"></div>`;
let   curidx, max = [ 0, 0 ];

class Welcome extends React.Component {

    state = {
        style: { display: "none" },
        state: "next_icon",
    }

    prevClick() {
        $( '.carousel.carousel-slider' ).carousel( "prev" );
    }

    nextClick() {
        if ( curidx != max ) {
            $( '.carousel.carousel-slider' ).carousel( "next" );
        } else {
            exit();
        }
    }

    closeClick() {
        exit();
    }

    componentDidMount() {
        max = $( ".carousel-item" ).length - 1;
        $( '.carousel.carousel-slider' ).carousel({
            fullWidth: true,
            onCycleTo: idx => {
                curidx = idx;
                if ( curidx == max ) {
                    this.setState({
                        style: { display: "block" },
                        state: "right_icon",
                    });
                } else if ( curidx == 0 ) {
                    this.setState({
                        style: { display: "none" },
                        state: "next_icon",
                    });
                } else {
                    this.state.style.display != "block" && this.setState({ style: { display: "block" } });
                    this.state.state != "next_icon"     && this.setState({ state: "next_icon" });
                }
            }
        });
    }

    componentWillUnmount() {
        $( welcbgclsjq ).remove();
    }

    render() {
        return (
            <welcome>
                <div className="carousel carousel-slider" data-indicators="true">
                    <div className="carousel-item">
                        <section>
                            <img src="chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/welcome-0.png"/>
                            <h2>欢迎使用 简悦</h2>
                            <div className="desc">
                                去掉干扰元素，提升阅读体验，<strong>简</strong>单阅读，<strong>愉</strong>悦心情。<br/>
                                为了达到 <strong>完美</strong> 的阅读模式，简悦适配了 <strong>120+</strong> 个网站。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section>
                            <img src="chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/welcome-1.png"/>
                            <h2>阅读模式</h2>
                            <div className="desc">
                                自动提取适配页面的标题、描述、正文、媒体 （ 图片/视频 ） 等资源。<br/>
                                定制化生成更适合中文阅读的页面。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section>
                            <img src="chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/welcome-2.png"/>
                            <h2>聚焦模式</h2>
                            <div className="desc">
                                自动高亮鼠标所在的文章段落，不改变当前页面的结构，适合未适配的网站。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section>
                            <img src="chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/welcome-3.png"/>
                            <h2>高度定制化</h2>
                            <div className="desc">
                                字体样式/大小、版本设计、主题均可设定。<br/>
                                页面上任意元素（ 不想显示的文字 / 图片 ）均可隐藏。
                            </div>
                        </section>
                    </div>
                    <div className="carousel-item">
                        <section>
                            <img src="chrome-extension://ljmlbfffbjjoeknbipaiilcijbbdchne/assets/images/welcome-0.png"/>
                            <h2>更多功能 等你发现！</h2>
                        </section>
                    </div>
                </div>
                <footer>
                    <Button style={ this.state.style }
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#C8E6C9"
                        icon={ ss.IconPath( "prev_icon" ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.prevClick() } />
                    <Button
                        shape="circle" width="40px"
                        color="#fff" backgroundColor="#4CAF50"
                        icon={ ss.IconPath( this.state.state ) }
                        waves="md-waves-effect md-waves-button"
                        onClick={ ()=>this.nextClick() } />
                </footer>
                <div className="close">
                    <Button
                        shape="circle" width="36px"
                        color="#fff" backgroundColor="transparent" hoverColor="transparent"
                        icon={ ss.IconPath( "close_icon" ) }
                        tooltip={{ text: "关闭用户向导" }}
                        onClick={ ()=>this.closeClick() } />
                </div>
            </welcome>
        )
    }
}

/**
 * Exit()
 */
function exit() {
    $( welcbgclsjq ).velocity({ opacity: 0 }, { complete: ()=>{
        ReactDOM.unmountComponentAtNode( $(welcbgclsjq)[0] );
    }});
}

/**
 * Welcome Render
 * 
 * @param {string} root name
 */
export function Render( root ) {
    const $root = $( root );
    if ( $root.find( "." + welcbgcls ).length == 0 ) {
        $root.append( welcbg );
    }
    ReactDOM.render( <Welcome />, $( welcbgclsjq )[0] );
}