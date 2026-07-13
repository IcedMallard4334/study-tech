import { useEffect, useState } from "react";
import { getSubjectsList, getTopicsForSubject } from "../services/communityService";

export function useSubjectsList(curriculum, grade) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!curriculum || !grade) return;
    getSubjectsList(curriculum, grade).then(setSubjects);
  }, [curriculum, grade]);

  return subjects;
}

export function useTopicsForSubject(subject, curriculum, grade) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (!subject || !curriculum || !grade) {
      setTopics([]);
      return;
    }
    getTopicsForSubject(subject, curriculum, grade).then(setTopics);
  }, [subject, curriculum, grade]);

  return topics;
}