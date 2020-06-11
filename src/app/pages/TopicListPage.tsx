import React from "react";
import Layout from "../components/Layout";
import { useQuery } from "react-query";
import API from "../api";
import TopicBrowser from "../components/topics/TopicBrowser";
import { useDeviceType } from "../hooks/useDeviceType";

type Props = {};

const TopicListPage: React.FC<Props> = () => {
  const { data: topics } = useQuery(["topics"], () => API.topics.list());
  const { isMobile } = useDeviceType();

  return (
    <Layout header="Temas">
      {topics && <img src={topics.image_url} alt="Hola" />}
      {topics && <TopicBrowser topics={topics} inline={isMobile} />}
    </Layout>
  );
};

export default TopicListPage;
