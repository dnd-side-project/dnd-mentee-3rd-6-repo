package org.dnd3.udongsa.neighborcats.doc;

import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.modifyUris;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;

public interface ApiDocUtils {
  // 도메인명 세팅
  static OperationRequestPreprocessor getDocumentRequest(){
    return preprocessRequest(modifyUris()
                              .scheme("http")
                              .host("devserver")
                              .port(80),
                              // .removePort(), 
                            prettyPrint());
  }

  // 
  static OperationResponsePreprocessor getDocumentResponse(){
    return preprocessResponse(prettyPrint());
  }
}