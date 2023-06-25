
const menuList = [
    {
        id: 1,
        item: 'Features',
        expand: false,
        subList: [
            {
                id: '1-1',
                subItem: 'Todo List',
                icon:'icon-todo.svg'
            },
            {
                id: '1-2',
                subItem: 'Calendar',
                icon:'icon-calendar.svg'
            },
            {
                id: '1-3',
                subItem: 'Reminders',
                icon:'icon-reminders.svg'
            },
            {
                id: '1-4',
                subItem: 'Planning',
                icon:'icon-planning.svg'
            }
        ]
    },
    {
        id: 2,
        item: 'Company',
        expand: false,
        subList: [
            {
                id: '2-1',
                subItem: 'History'
            },
            {
                id: '2-2',
                subItem: 'Our Team'
            },
            {
                id: '2-3',
                subItem: 'Blog'
            }
        ]
    },
    {
        id: 3,
        item: 'Careers'
    },
    {
        id: 4,
        item: 'About'
    }
]

const clientList = [
    {
        id: 'databiz',
        client: 'client-databiz.svg'
    },
    {
        id: 'audiophile',
        client: 'client-audiophile.svg'
    },
    {
        id: 'meet',
        client: 'client-meet.svg'
    },
    {
        id: 'maker',
        client: 'client-maker.svg'
    }
]

const root = ReactDOM.createRoot(document.getElementById('root'))


function Navigation({collapsed, onCollapsedChange}) { 

    function collapsedHandler() {
        onCollapsedChange(collapsed)
    }
    
    return (
        <nav className="navbar">
            <a href="#" className="navbar-logo">
                <img src="./images/logo.svg" alt="logo" />
            </a>
        
            <button className="navbar-menu" onClick={collapsedHandler}>
                <img src="./images/icon-menu.svg" alt="menu" />
            </button>
            
            <div className="navbar-list-container">
                <ul className="navbar-list">
                    {menuList.map(eachItem => 
                        <MenuList key={eachItem.id} eachItem={eachItem} />
                    )}
                </ul>
            
                <div className="navbar-buttons">
                    <button>Login</button>
                    <button>Register</button>
                </div>
            </div>
      </nav>
    )
}

function MenuList({eachItem}) {
    const [expand, setExpand] = React.useState(eachItem.expand);

    function expandHandler () {
        setExpand(!expand)
    }
    
    return (
        <li className="menu-takeover-list-item desktop" onClick={expandHandler}>
            {eachItem.item}

            {eachItem.subList ? <ExpandDropdown isExpand={expand} haveSubList={eachItem.subList} /> : ''}
        </li>
    )
}

function ExpandDropdown({isExpand, haveSubList}) {
    return (
        <>
        {
            isExpand ? 
            <button className="menu-takeover-list-item-expand">
                <img src="./images/icon-arrow-up.svg" alt="expand" />
            </button> : 
            <button className="menu-takeover-list-item-expand">
                <img src="./images/icon-arrow-down.svg" alt="collapse" />
            </button>
        }
        <SubListDropdown subList={haveSubList} expand={isExpand} />
        </>
    )
}

function SubListDropdown ({subList, expand}) {
    
    return (
        <ul className={`menu-takeover-sublist ${expand ? 'expandDropdown' : ''} desktop`}>
            {subList.map(subListItem => {
                return (
                    <li key={subListItem.id} className="menu-takeover-sublist-item">
                        {subListItem.icon ? 
                        <span className="menu-takeover-sublist-item-icon">
                            <img src={`./images/${subListItem.icon}`} alt={subListItem.subItem} />
                        </span> :
                        ''
                        }
                        {subListItem.subItem}
                    </li>
                )
            })}
        </ul>
    )
}

function MenuTakeover({collapsed, onCollapsedChange}) {
    function closeMenu () {
        onCollapsedChange(collapsed)
    }

    return(
        <div className={`menu-takeover-container ${!collapsed ? 'active' : ''}`}>
            <div className="menu-takeover-close">
                <button onClick={closeMenu}>
                    <img src="./images/icon-close-menu.svg" alt="Close menu" />
                </button>
            </div>
            
            <ul className="menu-takeover-list">
                {menuList.map(eachItem => {
                    return (
                        <MenuList key={eachItem.id} eachItem={eachItem} />
                    )
                })}
            </ul>

            <div className="menu-takeover-button-container">
                <button className="menu-takeover-button">Login</button>
                <button className="menu-takeover-button border">Register</button>
            </div>
        </div>
    )
}

function Modal({collapsed}) {
    return (
        !collapsed ? <div className="modal"></div> : ''
    )
}

function HeroBanner() {
    return (
        <picture className="hero-banner-img">
            <source media="(min-width: 1440px)" srcSet="./images/image-hero-desktop.png" />
            <source media="(max-width: 375px)" srcSet="./images/image-hero-mobile.png" />
            <img src="./images/image-hero-desktop.png" alt="Make remote work" />
        </picture>
    )
}

function HeaderContent() {
    return (
        <div className="hero-banner-content">
            <h1>Make remote work</h1>
            <p>
                Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch productivity soar.
            </p>
    
            <div className="hero-banner-content-button">
                <button>Learn more</button>
            </div>
        </div>
    )
}

function ClientList() {
    return (
        <ul className="hero-banner-clientList">
            {clientList.map(eachClient => 
                <li key={eachClient.id}><img src={`./images/${eachClient.client}`} alt={eachClient.id} /></li>
            )}
        </ul>
    )
}

function App() {
    const [collapsed, setCollapsed] = React.useState(true);

    function collapsedChange(collapsed) {
        setCollapsed(!collapsed)
    }

    return(
        <>
        <Navigation collapsed={collapsed} onCollapsedChange={collapsedChange} />

        {!collapsed ? <MenuTakeover collapsed={collapsed} onCollapsedChange={collapsedChange} /> : ''}
        {!collapsed ? <Modal collapsed={collapsed} /> : ''}
        
        <div className="hero-banner-container">
            <HeroBanner />
            <div className="hero-banner-content-container">
                <HeaderContent />
                <ClientList />
            </div>
        </div>
        </>
    )
}

root.render(<App />)