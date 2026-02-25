import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import * as styles from './Home.module.css';
import { AppIconLogo } from '../icons';
import {
  Accordion,
  ActionIcon,
  Button,
  CloseButton, Menu, rem, ScrollArea,
  Text
} from '@mantine/core';
import { CheckCircledIcon, DotsHorizontalIcon, FileTextIcon, GearIcon, InfoCircledIcon, OpacityIcon, PersonIcon, ReaderIcon, TableIcon } from '@radix-ui/react-icons';
import { IconFileTypeCss, IconFileTypeJs, IconPencil } from '@tabler/icons-react';
import { fetchPosts, getPostTypes, getSiteOptions, updateSiteOptions } from '../util/wpApi';
import cloneDeep from 'lodash/cloneDeep';
import { HomeProvider, useHomeContext } from './HomeContext';
import CMSManage from './CMSManage';
import CapturedStyles from './CapturedStyles';
import CapturedScripts from './CapturedScripts';
import { useGridAlign } from './useGridAlign';
import { calculateCardLayout } from './getAlignedCardWidth';
import { AddifectEdition } from '../App';

interface HomeProps {
  userData: {
    name: string;
    url: string;
    capable?: '1' | '2' | '3' | '4'
  };
  setEditor: React.Dispatch<React.SetStateAction<null | { type: string; id?: string }>>;
  edition: AddifectEdition,
  setEdition: React.Dispatch<React.SetStateAction<AddifectEdition>>;
}


const Home = (
  {
    userData,
    setEditor,
    edition,
    setEdition
  }: HomeProps) => {
  return <HomeProvider
    userData={userData}
    setEditor={setEditor}
    edition={edition}
    setEdition={setEdition}
  ><Inside /></HomeProvider>;
}

const Inside = () => {
  const { userData, edition } = useHomeContext();
  const [loading, setLoading] = useState(true);

  const [dialog, setDialog] = useState<null | 'template_manager' | 'settings'>(null);
  const [postTypes, setPostTypes] = useState<{ id: string, label: string, type: 'post' | 'page' | 'record' }[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    getPostTypes()
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
  }, []);


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
        boxSizing: "border-box",
        opacity: init ? 1 : 0,
        transition: 'opacity 1s ease'
      }}
    >
      <div
        ref={ref}
        className={styles.main}
      >
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.brand}>
              <div className={styles.brand_left}>
                <div className={styles.brand_wrap}>
                  <div className={styles.brand_logo}>
                    <AppIconLogo />
                  </div>
                  <div className={styles.brand_card}>
                    addifect
                  </div>
                </div>
                <div className={styles.nav_panel}>
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
                    {/* {[{
                      'id': 'addifect_design',
                      'label': 'Designs',
                      'type': 'design',
                    }].map((item, i) => { */}
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
                  className={styles.top_bar_mode}
                >{edition}</div>
                <div
                  className={styles.top_bar_author_name}
                >Hello! {userData.name}</div>
                {userData.url ? <img className={styles.top_bar_author_img} src={userData.url} alt={userData.name} /> :
                <div className={styles.top_bar_author_placeholder}><PersonIcon/></div>}
              </div>
            </div>
            {activeType ? <Cards id={activeType} slug={activeType} /> : ''}
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


const FilterItem = ({ children, active, onClick }: { children: ReactNode, active: boolean, onClick: () => void }) => {
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
  const [activeTab, setActiveTab] = useState('2');
  const [loaded, setLoaded] = useState(false);
  const [initOptions, setInitOptions] = useState<SiteOptions>({});
  const [siteOptionsData, setSiteOptionsData] = useState<SiteOptions>({});
  const [options, setOptions] = useState<SiteOptions>({});

  useEffect(() => {
    setLoaded(false);
    getSiteOptions()
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
  }, []);

  const canSave = JSON.stringify(initOptions) !== JSON.stringify(options);

  const [dataSaving, setDataSaving] = useState(false);

  const handleSaveData = async () => {
    setDataSaving(true);
    try {
      const response = await updateSiteOptions(
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
        {/* <div
          className={styles.dw_sidebar_pill}
          onClick={() => setActiveTab('1')}
          data-active={activeTab === '1'}
        >CMS</div> */}
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
        <span style={{fontSize: 11}}>To capture scripts and styles, <a href={`${window.addifectStudio?.home}/?addifect_capture_assets=1`} target="_blank">visit this link</a>after publishing your Addifect design. Then, refresh this page.</span>
          <Accordion variant="separated" radius="md">
            <Accordion.Item value='css'>
              <Accordion.Control icon={<IconFileTypeCss />}>Optimize CSS Loading</Accordion.Control>
              <Accordion.Panel>
                <div>
                  <Text size="xs">Enable/Disable external stylesheets and inline styles from loading in Addifect views (pages/posts).</Text>
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
                  <Text size="xs">Enable/Disable external scripts and inline JavaScript from loading in Addifect views (pages/posts).</Text>
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


const Cards = ({ id, slug }: { id: string, slug: string }) => {
  const { setEditor } = useHomeContext();
  const [items, setItems] = useState<{ id: string; title: string, addifect_edited?: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const wrapperRef = useRef(null);

  const cellWidth = 12;
  const gridGap = 2;
  const cardGap = 14;
  const cardsPerRow = 4;

  // Effect to check last edited time and fetch data if changed
  useEffect(() => {
    loadData(id);
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setItems([]);
  }, [id]);


  // Function to load data for specified post type
  const loadData = async (postType: string) => {
    setLoading(true);
    setLoadingError(false);
    try {
      const posts = await fetchPosts(postType);
      setItems(posts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoadingError(true);
    }
  };

  const renderItems = (items: { id: string; title: string, addifect_edited?: string, thumb?: string }[] | null) =>
    items && items.map(item => {
      return <div key={item.id}
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
      >
        {!loading && renderItems(items)}
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