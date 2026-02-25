import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import * as styles from './Home.module.css';
import { AppIconLogo } from '../icons';
import {
  Accordion,
  ActionIcon, Avatar,
  Button,
  CloseButton, Divider, LoadingOverlay, Menu, rem, ScrollArea, Skeleton,
  Text
} from '@mantine/core';
import { CheckCircledIcon, DotsHorizontalIcon, FileTextIcon, GearIcon, InfoCircledIcon, OpacityIcon, ReaderIcon, TableIcon } from '@radix-ui/react-icons';
import { IconFileTypeCss, IconFileTypeJs, IconPencil, IconSettings2, IconTemplate } from '@tabler/icons-react';
import TemplateMap from './TemplateMap';
import { fetchPosts, getPostTypes, getSiteOptions, getTemplatesData, updateSiteOptions, updateTemplateData } from '../util/wpApi';
import cloneDeep from 'lodash/cloneDeep';
import { HomeProvider, useHomeContext } from './HomeContext';
import CMSManage from './CMSManage';
import CapturedStyles from './CapturedStyles';
import CapturedScripts from './CapturedScripts';
import GridBackground, { getGridBackgroundStyle } from './GridBackground';
import { useGridAlign } from './useGridAlign';
import { calculateCardLayout } from './getAlignedCardWidth';

interface HomeProps {
  userData: {
    name: string;
    url: string;
    capable: '1' | '2' | '3' | '4'
  };
  setEditor: React.Dispatch<React.SetStateAction<null | { type: string; id?: string }>>;
  auth: undefined | React.ReactElement;
  clientAPI: string;
  authToken: string;
  handleApiError: (error: any) => void;
}


const Home = (
  {
    userData,
    clientAPI,
    authToken,
    setEditor,
    handleApiError
  }: HomeProps) => {
  return <HomeProvider
    userData={userData}
    clientAPI={clientAPI}
    authToken={authToken}
    setEditor={setEditor}
    handleApiError={handleApiError}
  ><Inside /></HomeProvider>;
}

const Inside = () => {
  const { userData, clientAPI, authToken } = useHomeContext();
  const [loading, setLoading] = useState(true);

  const [dialog, setDialog] = useState<null | 'template_manager' | 'settings'>(null);
  const [postTypes, setPostTypes] = useState<{ id: string, label: string, type: 'post' | 'page' | 'record' }[]>([]);

  const ref = useRef<HTMLDivElement>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [margin, setMargin] = useState(0);

  const cell = 26;
  const gap = 2;
  const size = cell + gap;

  const cellWidth = 12;
  const step = cellWidth + gap;

  const { ref: nameRef, alignedWidth } = useGridAlign(step, gap, "next", "right");


  useEffect(() => {
    function updateDimensions() {
      if (!ref.current) return;

      const parent = ref.current.parentElement!;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      // Fit whole cells horizontally
      const fullCols = Math.floor(parentWidth / size);
      const gridWidth = fullCols * size;

      // Left/right margins
      const leftoverWidth = parentWidth - gridWidth;
      const margin = leftoverWidth / 2;

      // Available height after considering left/right margins
      const availableHeight = parentHeight - leftoverWidth;

      // Fit whole cells vertically
      const fullRows = Math.floor(availableHeight / size);
      const gridHeight = fullRows * size;

      setGridWidth(gridWidth);
      setGridHeight(gridHeight);
      setMargin(margin);
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    setLoading(true);
    getPostTypes(clientAPI)
      .then(response => {
        if (response) {
          setPostTypes(response)
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading style data:', error);
        setLoading(false);
      });
  }, [clientAPI, authToken]);


  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);


  const filterIcons = {
    page: <FileTextIcon />,
    post: <ReaderIcon />,
    record: <TableIcon />,
    design: <OpacityIcon />
  }

  const ucd = (userData.capable === '1' || userData.capable === '2');

  const [activeType, setActiveType] = useState<string | null>(null);

  useEffect(() => {
    if (postTypes.length) {
      setActiveType(postTypes[0].id);
    }
  }, [postTypes]);

  return (
    <div
      className={styles.mainWrap}
      style={{
        width: "100%",
        height: "100%",
        padding: `${margin}px`,
        boxSizing: "border-box",
        opacity: init ? 1 : 0,
        transition: 'opacity 1s ease'
      }}
    >
      <div
        ref={ref}
        style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
        className={styles.main}
      >
        <GridBackground />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.brand}>
              <div className={styles.brand_left}>
                <div className={styles.brand_wrap}>
                  <div className={styles.brand_logo}>
                    <AppIconLogo />
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.brand_card}>
                    addifect
                  </div>
                </div>
                <div className={styles.nav_panel}>
                  <div className={styles.nav_gap}></div>
                  <div className={styles.nav_item}
                    onClick={() => setDialog('settings')}
                  >
                    <div className={styles.nav_item_icon}>
                      <GearIcon />
                    </div>
                    Settings
                  </div>
                  <div className={styles.nav_item}>
                    <div className={styles.nav_item_icon}>
                      <InfoCircledIcon />
                    </div>
                    Help
                  </div>
                  <div className={styles.nav_fill}></div>
                </div>
              </div>
              <div className={styles.brand_right}>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top_bar}>
              <div className={styles.top_bar_filter} >
                <Loader loaded={!loading} />
                {loading ? '' :
                  <>
                    {postTypes.map((item, i) => {
                      const active = activeType === item.id;
                      return <FilterItem
                        key={item.id}
                        active={active}
                        onClick={() => setActiveType(item.id)}
                      >
                        <span>{filterIcons[item.type]}</span>{item.label}
                      </FilterItem>
                    })}
                  </>
                }
              </div>
              <div className={styles.top_bar_author_card}>
                <div
                  ref={nameRef}
                  className={styles.top_bar_author_name}
                  style={{ width: alignedWidth ? `${alignedWidth}px` : "auto" }}
                >Hello! {userData.name}</div>
                <img className={styles.top_bar_author_img} src={userData.url} alt={userData.name} />
              </div>
            </div>
            {activeType ? <Cards id={activeType} slug={'design'} /> : ''}
          </div>
        </div>
      </div>
      {dialog === 'settings' &&
        <SiteSettings
          close={() => setDialog(null)}
        />
      }
    </div>
  );
}

export default Home;


const FilterItem = ({ children, active, onClick }: {children: ReactNode, active: boolean, onClick: ()=> void}) => {
  const gap = 2;

  const cellWidth = 12;
  const step = cellWidth + gap;

  const { ref: nameRef, alignedWidth } = useGridAlign(step, gap, "next", "right");

  return <div
    ref={nameRef}
    className={styles.top_bar_filter_btn}
    style={{ width: alignedWidth ? `${alignedWidth}px` : "auto" }}
    data-active={active}
    onClick={onClick}
  >{children}</div>
}


const TopBar = ({ dialogAction }: {
  dialogAction: {
    dialog: null | 'template_manager' | 'settings',
    setDialog: React.Dispatch<React.SetStateAction<null | 'template_manager' | 'settings'>>;
  }
}) => {
  const { userData } = useHomeContext();

  return <div className={styles.topBar}>
    <div className={styles.topBarCol}>
      <span className={styles.logo}> <img width='42px' src="/img/logo_.png" alt="Logo" /></span>
      <span className={styles.title}>addifect</span>
    </div>
    <div className={styles.topBarCol} style={{ justifyContent: 'center' }}>
      {(userData.capable === '1' || userData.capable === '2') && <ActionIcon
        variant="subtle"
        color='gray'
        onClick={() => dialogAction.setDialog('template_manager')}
        size="md"
      >
        <IconTemplate width='70%' height='70%' stroke={2} />
      </ActionIcon>}
      {userData.capable === '1' && <ActionIcon
        variant="subtle"
        color='gray'
        onClick={() => dialogAction.setDialog('settings')}
        size="md"
      >
        <IconSettings2 width='70%' height='70%' stroke={2} />
      </ActionIcon>}
    </div>
    <div className={styles.topBarCol} style={{ justifyContent: 'end' }}>
      <div className={styles.userName}>Hello! {userData.name}</div>
      <Avatar src={userData.url} alt={userData.name} size="sm" ml="sm" />
    </div>
  </div>
}

const DialogWrap = (
  { title, close, children }:
    { title: string, close: () => void, children: ReactElement[] | ReactElement }
) => {
  return <div className={styles.dw_outer_wrap}>
    <div className={styles.dw_wrap}>
      <div className={styles.dw_topbar}>{title}<CloseButton onClick={close} /></div>
      <div className={styles.dw_container}>
        {children}
      </div>
    </div>
  </div>
}

interface MapInterface {
  selectedTemplates: { [key: string]: string | string[] };
  defaultTemplates: { [key: string]: string }
}

const TemplateManager = ({ close }: { close: () => void }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [loaded, setLoaded] = useState(false);
  const [initMap, setInitMap] = useState<MapInterface | {}>({});
  const [map, setMap] = useState<MapInterface | {}>({});
  const [templates, setTemplates] = useState([]);
  const [parts, setParts] = useState([]);

  const { clientAPI, authToken, postTypes } = useHomeContext();


  useEffect(() => {
    setLoaded(false);
    getTemplatesData(clientAPI)
      .then(response => {
        if (response?.map && typeof response?.map === 'object') {
          setInitMap(response.map);
          setMap(response.map);
        }
        if (response?.templates && Array.isArray(response.templates)) {
          setTemplates(response.templates);
        }
        if (response?.parts && Array.isArray(response.parts)) {
          setParts(response.parts);
        }
        setLoaded(true);
      })
      .catch(error => {
        setLoaded(true);
        console.error('Error loading style data:', error);
      });
  }, [clientAPI, authToken]);

  const canSave = JSON.stringify(initMap) !== JSON.stringify(map);

  const [dataSaving, setDataSaving] = useState(false);

  const handleSaveData = async () => {
    setDataSaving(true);
    try {
      const response = await updateTemplateData(
        clientAPI,
        authToken,
        {
          template_map: map
        }
      );

      setInitMap(cloneDeep(map));
      setDataSaving(false);
    } catch (error) {
      console.error('Error saving style data:', error);
      setDataSaving(false);
    }
  }

  return <DialogWrap title="Template Manager" close={close}>
    {!loaded ? <LoadingOverlay visible={!loaded} /> :
      <>
        <div className={styles.tm_sidebar}>
          <div>
            <div
              className={styles.tm_sidebar_pill}
              onClick={() => setActiveTab('1')}
              data-active={activeTab === '1'}
            >Map</div>
            <div
              className={styles.tm_sidebar_pill}
              onClick={() => setActiveTab('2')}
              data-active={activeTab === '2'}
            >Templates</div>
          </div>
          <div className={styles.tm.sidebar_footer}>
            <Button
              disabled={!canSave}
              fullWidth
              size="xs"
              loading={dataSaving}
              onClick={handleSaveData}
            >Save Changes</Button>
          </div>
        </div>
        <div className={styles.tm_content}>
          <ScrollArea h="100%">
            {activeTab === '1' && <TemplateMap
              templateList={templates}
              partList={parts}
              onChange={setMap}
              map={map} />}
            {activeTab === '2' && <>
              <TemplateList title="Templates" data={templates} />
              <TemplateList title="Parts" data={parts} />
            </>}
          </ScrollArea>
        </div>
      </>
    }
  </DialogWrap>
}


export interface SiteOptions {
  custom_posts?: {
    id: string,
    slug: string,
    archiveSlug: string,
    labelSingle: string,
    labelPlural: string,
    type: 'post' | 'record',
    fields: { label: string, type: string }[]
  }[]
}

const SiteSettings = ({ close }: { close: () => void; }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [loaded, setLoaded] = useState(false);
  const [initOptions, setInitOptions] = useState<SiteOptions>({});
  const [siteOptionsData, setSiteOptionsData] = useState<SiteOptions>({});
  const [options, setOptions] = useState<SiteOptions>({});

  const { clientAPI, authToken } = useHomeContext();

  useEffect(() => {
    setLoaded(false);
    getSiteOptions(clientAPI)
      .then(response => {
        if (response?.site_options_data && typeof response?.site_options_data === 'object') {
          setSiteOptionsData(response.site_options_data);
        }
        if (response?.site_options && typeof response?.site_options === 'object') {
          setInitOptions(response.site_options);
          setOptions(response.site_options);
        }
        setLoaded(true);
      })
      .catch(error => {
        setLoaded(true);
        console.error('Error loading style data:', error);
      });
  }, [clientAPI, authToken]);

  const canSave = JSON.stringify(initOptions) !== JSON.stringify(options);

  const [dataSaving, setDataSaving] = useState(false);

  const handleSaveData = async () => {
    setDataSaving(true);
    try {
      const response = await updateSiteOptions(
        clientAPI,
        {
          site_options: options
        }
      );

      setInitOptions(cloneDeep(options));
      setDataSaving(false);
    } catch (error) {
      console.error('Error saving style data:', error);
      setDataSaving(false);
    }
  }

  // const [hash, setHash] = useState(Date.now());
  // useEffect(() => {
  //   // Trigger hash update only when essential.
  //   setHash(Date.now());
  //   console.log('update hash');

  // }, [options]);

  const handleOptionChange = (option: string, value: any) => {
    setOptions((prev) => {
      return {
        ...prev,
        [option]: value
      }
    }
    )
  }


  return <DialogWrap title="Settings" close={close}>
    <Loader loaded={loaded} />
    <div className={styles.dw_sidebar}>
      <div>
        <div
          className={styles.dw_sidebar_pill}
          onClick={() => setActiveTab('1')}
          data-active={activeTab === '1'}
        >CMS</div>
        <div
          className={styles.dw_sidebar_pill}
          onClick={() => setActiveTab('2')}
          data-active={activeTab === '2'}
        >Optimize</div>
      </div>
      <div className={styles.dw_sidebar_footer}>
        <Button
          disabled={!canSave}
          fullWidth
          size="xs"
          loading={dataSaving}
          onClick={handleSaveData}
        >Save Changes</Button>
      </div>
    </div>
    <div className={styles.dw_content}>
      <ScrollArea h="100%">
        {activeTab === '1' && <CMSManage options={options} setOptions={handleOptionChange} />}
        {activeTab === '2' && <>
          <Accordion variant="separated" radius="md" defaultValue="css">
            <Accordion.Item value='css'>
              <Accordion.Control icon={<IconFileTypeCss />}>Optimize CSS Loading</Accordion.Control>
              <Accordion.Panel>
                <div>
                  <Text size="xs">Exclude selected external stylesheets and inline styles from loading in Addifect views (pages/posts).</Text>
                  <CapturedStyles
                    styles={siteOptionsData?.registered_styles || []}
                    options={options}
                    setOptions={handleOptionChange}
                  />
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value='js'>
              <Accordion.Control icon={<IconFileTypeJs />}>Optimize JS Loading</Accordion.Control>
              <Accordion.Panel>
                <div>
                  <Text size="xs">Exclude selected external scripts and inline JavaScript from loading in Addifect views (pages/posts).</Text>
                  <CapturedScripts
                    scripts={siteOptionsData?.registered_scripts || []}
                    options={options}
                    setOptions={handleOptionChange}
                  />
                </div>
                {/* <CapturedStyles styles={siteOptionsData?.registered_styles || []} /> */}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </>}
      </ScrollArea>
    </div>
  </DialogWrap >
}




const TemplateList = ({ title, data }: { title: string, data: { id: string, title: string, addifect_edited: boolean }[] }) => {
  const { setEditor } = useHomeContext();
  const renderItems = () =>
    data.map(item => {
      return <div key={item.id} className={styles.tm_temp_card_item}>
        <div className={styles.tm_temp_card_item_detail}>
          {item.addifect_edited &&
            <span className={styles.tm_temp_card_item_icon} ><CheckCircledIcon /></span>
          }
          <div className={styles.tm_temp_card_item_label}>
            {item.title}
          </div>
        </div>
        <Menu shadow="md" withArrow position="bottom-end" withinPortal={false}>
          <Menu.Target>
            <ActionIcon variant="transparent" color="light">
              <DotsHorizontalIcon />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
              onClick={() =>
                setEditor({
                  type: 'block',
                  id: item.id
                })
              }
            >
              Edit
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    });

  return <div className={styles.content_card}>
    <Divider my={12} label={title} labelPosition="left" />
    <div>{renderItems()}</div>
  </div>
}




const Cards = ({ id, slug }: { id: string, slug: string }) => {
  const { authToken, clientAPI, handleApiError, setEditor } = useHomeContext();
  const [items, setItems] = useState<{ id: string; title: string, addifect_edited?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const wrapperRef = useRef(null);
  const [layout, setLayout] = useState({ cardWidth: 0, offsetLeft: 0 });

  const cellWidth = 12;
  const gridGap = 2;
  const cardGap = 14;
  const cardsPerRow = 4;

  useEffect(() => {
    function update() {
      if (!wrapperRef.current) return;
      const width = wrapperRef.current.offsetWidth;
      const result = calculateCardLayout(width, cardsPerRow, cardGap);
      setLayout(result);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);



  // Effect to check last edited time and fetch data if changed
  useEffect(() => {
    if (authToken && clientAPI) {
      loadData(id, slug);
    }
  }, [authToken, clientAPI, id]);

  useEffect(() => {
    setLoading(true);
    setItems([]);
  }, [id]);


  // Function to load data for specified post type
  const loadData = async (postType: string) => {
    if (!clientAPI || !authToken) { return; }
    setLoading(true);
    setLoadingError(false);
    try {
      const posts = await fetchPosts(clientAPI, authToken, postType);
      setItems(posts);
      setLoading(false);
    } catch (error) {
      handleApiError(error);
      setLoading(false);
      setLoadingError(true);
    }
  };

  const renderSkeletons = () => (
    <div className={styles.content_card_skeletons}>
      <Skeleton height={12} my={8} width="100%" radius="sm" />
      <Skeleton height={12} my={8} width="100%" radius="sm" />
      <Skeleton height={12} my={8} width="100%" radius="sm" />
    </div>
  );

  const renderItems = (items: { id: string; title: string, addifect_edited?: string, thumb: string }[] | null) =>
    items && items.map(item => {
      return <div key={item.id}
        style={{ width: layout?.cardWidth }}
        className={styles.content_cards_item}>
        <div className={styles.content_cards_item_image}
          style={{ backgroundImage: `url(${item.thumb})` }}
        >
          {!item.thumb && item.title[0]}
        </div>
        <div className={styles.content_cards_item_detail}>
          <div className={styles.content_cards_item_detail_left}>
            {item.addifect_edited &&
              <span className={styles.content_cards_item_icon} ><CheckCircledIcon /></span>
            }
            <div className={styles.content_cards_item_label}>
              {item.title}
            </div>
          </div>
          <Menu shadow="md" withArrow position="bottom-end" withinPortal={false}>
            <Menu.Target>
              <ActionIcon variant="transparent" color="light">
                <DotsHorizontalIcon />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                onClick={() =>
                  setEditor({
                    type: 'block',
                    id: item.id
                  })
                }
              >
                Edit
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    });




  return <div className={styles.content_cards}>
    <ScrollArea h='100%' w='100%' scrollbarSize={2}>
      <div className={styles.content_cards_wrap}
        ref={wrapperRef}
        style={{
          ...getGridBackgroundStyle()
        }}
      >
        {!loading && renderItems(items, id)}
        <Loader loaded={!loading} />
      </div>
    </ScrollArea>
  </div>
}

const Loader = ({ loaded }: { loaded: boolean }) => {
  return <div className={styles.loader} data-loaded={loaded}>
    <div className={styles.loader_logoWrap}>
      <div className={styles.brand_logo}>
        <AppIconLogo />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
}